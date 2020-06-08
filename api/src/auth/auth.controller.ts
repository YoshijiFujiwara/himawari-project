import { Controller, ValidationPipe, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SingInUserDto } from './dto/sign-in-user.dto';
import { AccessToken } from './interface/access-token.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

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
}
