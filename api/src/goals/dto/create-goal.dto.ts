import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { text } from 'express';

export class CreateGoalDto {
  @ApiProperty({
    example: 'TOIEC800点以上取る',
  })
  @IsNotEmpty({
    message: 'タイトルの入力は必須です',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title: string;

  @ApiPropertyOptional({
    example: '2021年度の初回実施日に取りたい',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'publicに公開するか否か',
    default: true,
  })
  @IsBoolean()
  is_public: boolean;

  @ApiProperty({
    description: '投稿ユーザーのID',
    example: 1,
  })
  @IsNumber()
  user_id: number;
}