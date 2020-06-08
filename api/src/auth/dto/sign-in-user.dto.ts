import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
} from 'class-validator';

export class SingInUserDto {
  // ユーザー名とメールアドレスはsign_in時はOR
  @ApiProperty()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  password: string;
}
