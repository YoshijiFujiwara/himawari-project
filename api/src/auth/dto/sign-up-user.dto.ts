import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({
    example: 'test1',
    minLength: 5,
    maxLength: 20,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty({ message: '名前の入力は必須です' })
  username: string;

  @ApiProperty({
    example: 'test1@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'メールアドレスの入力は必須です' })
  email: string;

  @ApiProperty({
    example: 'hogehoge',
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty({ message: 'パスワードの入力は必須です' })
  password: string;
}
