import { Controller, ValidationPipe, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthSerializer } from './auth.serializer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign_up')
  @ApiResponse({
    status: 200,
    description: 'ユーザー登録完了',
  })
  signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<AuthSerializer> {
    return this.authService.signUp(createUserDto);
  }
}
