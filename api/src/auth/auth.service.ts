import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup(): Promise<{ message: string }> {
    return {
      message: 'これはダミーです。',
    };
  }
}
