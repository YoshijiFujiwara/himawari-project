import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BulkUpdateGoalsDto {
  @ApiProperty({
    description: '紐づけるゴールのID',
    example: [1, 2, 4],
  })
  @IsNumber(undefined, { each: true })
  goalIds: number[];
}
