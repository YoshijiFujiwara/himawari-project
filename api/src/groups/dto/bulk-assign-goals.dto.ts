import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BulkAssignGoalsDto {
  @ApiProperty({
    description: '紐づけるゴールのID',
    example: [1, 2, 4],
    type: [Number],
  })
  @IsNumber(undefined, { each: true })
  goalIds: number[];
}
