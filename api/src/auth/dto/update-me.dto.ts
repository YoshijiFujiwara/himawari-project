import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateMeDto {
  @ApiProperty({
    example: 'updated_test1',
    minLength: 5,
    maxLength: 20,
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
  })
  @IsOptional()
  @IsString()
  statusMessage?: string;
}
