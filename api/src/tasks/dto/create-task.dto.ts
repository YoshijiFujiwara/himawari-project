import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'タイトルの入力は必須です' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: '説明の入力は必須です' })
  description: string;
}
