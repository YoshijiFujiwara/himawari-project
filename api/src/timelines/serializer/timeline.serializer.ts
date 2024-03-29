import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';
import { ReactionSerializer } from '../../reactions/serializer/reaction.serializer';
import { CommentSerializer } from '../../comments/serializer/comment.serializer';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';
import { TimelineTypeEnum } from '../timeline-type.enum';
import { GoalLabelEnum } from '../../goals/goal-label.enum';

export class TimelineSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: TimelineTypeEnum,
  })
  type: TimelineTypeEnum;

  @ApiPropertyOptional({
    type: CommitSerializer,
  })
  commit?: CommitSerializer;

  @ApiPropertyOptional({
    type: GoalSerializer,
  })
  goal?: GoalSerializer;

  @ApiProperty({
    enum: GoalLabelEnum,
  })
  fromLabel: GoalLabelEnum;

  @ApiProperty({
    enum: GoalLabelEnum,
  })
  toLabel: GoalLabelEnum;

  @ApiPropertyOptional({
    type: () => [ReactionSerializer],
  })
  reactions: ReactionSerializer[];

  @ApiPropertyOptional({
    type: () => [CommentSerializer],
  })
  comments: CommentSerializer[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
