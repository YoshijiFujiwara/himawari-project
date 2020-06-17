import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';

export class CommitSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  spendTime: Date;

  @ApiProperty()
  goalId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  goal: GoalSerializer;
}
