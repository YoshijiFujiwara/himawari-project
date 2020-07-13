import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReactionType } from '../reaction-type.enum';
import { UserEntity } from '../../auth/user.entity';
import { TimelineEntity } from '../../timelines/timeline.entity';

export class ReactionSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  emoji: ReactionType;

  @ApiProperty()
  timelineId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({
    type: TimelineEntity,
  })
  timeline: TimelineEntity;

  @ApiPropertyOptional({
    type: UserEntity,
  })
  user: UserEntity;
}
