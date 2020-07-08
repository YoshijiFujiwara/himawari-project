import { ApiProperty } from '@nestjs/swagger';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';

export class GoalTimelineSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: GoalSerializer,
  })
  commit: GoalSerializer;
}
