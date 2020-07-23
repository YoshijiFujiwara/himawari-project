import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    example: 'test',
  })
  @IsString()
  @IsNotEmpty({ message: 'キーワードの入力は必須です' })
  keyword: string;
}
