import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';

export class CommitSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  spend_time: Date;

  @ApiProperty()
  goalId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  goal: GoalSerializer;
}
