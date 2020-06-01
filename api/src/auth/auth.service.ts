import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signup(): Promise<{ message: string }> {
    return {
      message: 'これはダミーです。',
    };
  }
}
