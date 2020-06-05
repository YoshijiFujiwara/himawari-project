import { Controller, ValidationPipe, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign_up')
  @ApiResponse({
    status: 201,
    description: 'ユーザー登録完了',
  })
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/sign_in')
  @ApiResponse({
    status: 200,
    description: 'ユーザーログイン完了',
  })
  signIn(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }
}
