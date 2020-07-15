import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSerializer } from '../../auth/serializer/user.serializer';
import { TimelineSerializer } from '../../timelines/serializer/timeline.serializer';

export class CommentSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  timelineId: number;

  @ApiProperty()
  groupId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({
    type: UserSerializer,
  })
  user: UserSerializer;

  @ApiPropertyOptional({
    type: TimelineSerializer,
  })
  timeline: TimelineSerializer;
}
