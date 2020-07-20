import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReactionType } from '../reaction-type.enum';
import { TimelineSerializer } from '../../timelines/serializer/timeline.serializer';
import { UserSerializer } from '../../auth/serializer/user.serializer';

export class ReactionSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: ReactionType,
  })
  emoji: ReactionType;

  @ApiProperty()
  timelineId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({
    type: () => TimelineSerializer,
  })
  timeline: TimelineSerializer;

  @ApiPropertyOptional({
    type: UserSerializer,
  })
  user: UserSerializer;
}
