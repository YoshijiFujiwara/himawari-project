import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/signup')
  @ApiResponse({
    status: 200,
    description: 'Authへの接続確認',
  })
  signup(): Promise<{ message: string }> {
    return this.authService.signup();
  }
}
