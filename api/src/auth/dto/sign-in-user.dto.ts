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
  @MinLength(1)
  @MaxLength(20)
  username?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty({ message: 'パスワードの入力は必須です' })
  password: string;
}
