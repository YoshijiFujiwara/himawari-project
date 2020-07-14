import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'ファイト！',
  })
  @IsNotEmpty({
    message: 'コメントの入力は必須です',
  })
  @IsString()
  content: string;
}
