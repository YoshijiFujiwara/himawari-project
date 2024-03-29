import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateMeDto {
  @ApiProperty({
    example: '田中太郎ジュニア',
  })
  @IsString()
  username: string;

  @ApiPropertyOptional({
    example: 'http://i.pravatar.cc/64',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: '休暇中です',
    minLength: 0,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  statusMessage: string;
}
