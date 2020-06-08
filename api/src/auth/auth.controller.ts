import { Controller, ValidationPipe, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SingInUserDto } from './dto/sign-in-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign_up')
  @ApiResponse({
    status: 201,
    description: 'ユーザー登録完了',
  })
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<void> {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('/sign_in')
  @ApiResponse({
    status: 200,
    description: 'ユーザーログイン完了',
  })
  signIn(@Body(ValidationPipe) signInUserDto: SingInUserDto) {
    return this.authService.signIn(signInUserDto);
  }
}
