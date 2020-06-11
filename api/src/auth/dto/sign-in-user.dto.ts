import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInUserDto {
  // ユーザー名とメールアドレスはsign_in時はOR
  @ApiProperty()
  username?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  @IsString()
  password: string;
}
