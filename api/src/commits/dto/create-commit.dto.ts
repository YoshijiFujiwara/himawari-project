import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCommitDto {
  @ApiProperty({
    example: 'Writingのテスト問題集',
    minLength: 1,
    maxLength: 20,
  })
  @IsNotEmpty({
    message: '学習名の入力は必須です',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title: string;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 5,
    maximum: 23,
    minimum: 0,
  })
  @IsNotEmpty({
    message: '学習時間(時)の入力は必須です',
  })
  @IsNumber()
  studyHours: number;

  @ApiProperty({
    example: 16,
    maximum: 59,
    minimum: 0,
  })
  @IsNotEmpty({
    message: '学習時間(分)の入力は必須です',
  })
  @IsNumber()
  studyMinutes: number;
}
