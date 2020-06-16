import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetGoalFilterDto {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty({
    message: '目標のIDが必要です',
  })
  @IsNumber()
  id: number;
}
