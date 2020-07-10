import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateMeDto {
  @ApiProperty({
    example: 'updated_test1',
    minLength: 5,
    maxLength: 20,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @ApiPropertyOptional({
    example: 'http://i.pravatar.cc/64',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: '休暇中です',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  statusMessage?: string;
}
