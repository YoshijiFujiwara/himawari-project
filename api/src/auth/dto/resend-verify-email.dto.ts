import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class ResendVerifyEmailDto {
  @ApiProperty({
    example: 'test1@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'メールアドレスの入力は必須です' })
  email: string;
}
