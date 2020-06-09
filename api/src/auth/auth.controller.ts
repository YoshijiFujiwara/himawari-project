import {
  Controller,
  ValidationPipe,
  Body,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SingInUserDto } from './dto/sign-in-user.dto';
import { AccessToken } from './interface/access-token.type';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'ユーザー登録完了',
  })
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<void> {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('/signin')
  @ApiResponse({
    status: 200,
    type: SingInUserDto,
    description: 'ユーザーログイン完了',
  })
  signIn(
    @Body(ValidationPipe) signInUserDto: SingInUserDto,
  ): Promise<AccessToken> {
    return this.authService.signIn(signInUserDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status: 200,
    type: SingInUserDto,
    description: 'ユーザーログイン完了',
  })
  googleLogin() {
    // Google OAuth2 ログイン
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.accessToken;
    if (jwt) {
      res.redirect('https://himawari.dev/login/success/' + req.user.username);
    } else {
      res.redirect('https://himawari.dev/login/failure');
    }
  }
}
