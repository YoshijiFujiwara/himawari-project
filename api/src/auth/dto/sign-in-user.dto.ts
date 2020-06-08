import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
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
