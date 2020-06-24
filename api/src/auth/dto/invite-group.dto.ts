import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteGroupDto {
  @ApiProperty({
    example: 'test2@gmail.com',
  })
  @IsNotEmpty({ message: 'メールアドレスの入力は必須です' })
  @IsEmail()
  email: string;
}
