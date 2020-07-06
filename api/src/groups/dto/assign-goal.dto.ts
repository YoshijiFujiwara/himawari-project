import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignGoalDto {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty({
    message: '目標IDは必須です',
  })
  @IsNumber()
  goalId: number;
}
