import { ApiProperty } from '@nestjs/swagger';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';

export class TimelineSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: CommitSerializer || GoalSerializer,
  })
  post: CommitSerializer | GoalSerializer;
}
