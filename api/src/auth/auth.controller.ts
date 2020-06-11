import {
  Controller,
  ValidationPipe,
  Body,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UserEntity } from './user.entity';
import { AccessTokenSerializer } from './serializer/access-token.serializer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'ユーザー登録完了(メール送信)',
  })
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<void> {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('/signin')
  @ApiResponse({
    status: 200,
    type: AccessTokenSerializer,
    description: 'ユーザーログイン完了',
  })
  signIn(
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
  ): Promise<AccessTokenSerializer> {
    return this.authService.signIn(signInUserDto);
  }

  @Get('/email/verify/:token')
  @ApiResponse({
    status: 200,
    description: 'ユーザー本登録完了',
  })
  verifyEmail(@Param('token') token: string): Promise<void> {
    return this.authService.verifyEmail(token);
  }
}
