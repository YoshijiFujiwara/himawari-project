import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class SignUpUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsNotEmpty({ message: '名前の入力は必須です' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'メールアドレスの入力は必須です' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty({ message: 'パスワードの入力は必須です' })
  password: string;
}
