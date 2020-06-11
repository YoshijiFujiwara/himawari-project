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
import { AccessTokenDto } from './dto/access-token.dto';
import { UserEntity } from './user.entity';

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

  @Get('/email/verify/:token')
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'ユーザー本登録完了',
  })
  emailVerify(@Param('token') username: string): Promise<UserEntity> {
    return this.authService.emailVerify(username);
  }

  @Post('/signin')
  @ApiResponse({
    status: 200,
    type: AccessTokenDto,
    description: 'ユーザーログイン完了',
  })
  signIn(
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
  ): Promise<AccessTokenDto> {
    return this.authService.signIn(signInUserDto);
  }
}
