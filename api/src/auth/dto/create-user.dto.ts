import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '名前の入力は必須です' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'メールアドレスの入力は必須です' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'パスワードの入力は必須です' })
  password: string;
}