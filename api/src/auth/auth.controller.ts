import {
  Controller,
  ValidationPipe,
  Body,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
  Param,
  HttpCode,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenSerializer } from './serializer/access-token.serializer';

import { UserSerializer } from './serializer/user.serializer';
import { GetUser } from './get-user-decorator';
import { UserEntity } from './user.entity';
import { UpdateMeDto } from './dto/update-me.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'ユーザー登録完了(メール送信)',
  })
  @ApiBadRequestResponse({
    description: '入力値のフォーマットエラー',
  })
  @ApiConflictResponse({
    description: 'usernameまたはemailの重複エラー',
  })
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<void> {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('/signin')
  @HttpCode(200)
  @ApiOkResponse({
    type: AccessTokenSerializer,
    description: 'ユーザーログイン完了',
  })
  @ApiUnauthorizedResponse({
    description:
      'メール認証ができてない、もしくはusername(email)またはpasswordが違う',
  })
  signIn(
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
  ): Promise<AccessTokenSerializer> {
    return this.authService.signIn(signInUserDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOkResponse({
    description: 'グーグルログイン',
  })
  googleLogin() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = await req.user.jwt;

    if (jwt) {
      res.redirect(
        `${process.env.CLIENT_URL}/auth/signin_success?token=${jwt}`,
      );
    } else {
      res.redirect(`${process.env.CLIENT_URL}/auth/signin_failure`);
    }
  }

  @Get('/email/verify/:token')
  @ApiOkResponse({
    description: 'ユーザー本登録完了',
  })
  @ApiNotFoundResponse({
    description: '無効なトークン',
  })
  @ApiBadRequestResponse({
    description: 'メール認証済',
  })
  verifyEmail(@Param('token') token: string): Promise<void> {
    return this.authService.verifyEmail(token);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: UserSerializer,
    description: 'ログインユーザー自身の情報を取得',
  })
  me(@GetUser() user: UserEntity): UserSerializer {
    return user.transformToSerializer();
  }

  @Put('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: UserSerializer,
    description: 'ログインユーザー自身の情報を更新する',
  })
  async updateMe(
    @Body(ValidationPipe) updateMeDto: UpdateMeDto,
    @GetUser() user: UserEntity,
  ): Promise<UserSerializer> {
    const me = await this.authService.updateMe(user, updateMeDto);
    return me.transformToSerializer();
  }
}
