import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateCommitDto {
  @ApiProperty({
    example: 'Writingのテスト問題集',
  })
  @IsNotEmpty({
    message: '学習名の入力は必須です',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '学習時間の入力は必須です',
  })
  @IsDate()
  spendTime: Date;
}
