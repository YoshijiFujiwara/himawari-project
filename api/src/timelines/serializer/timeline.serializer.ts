import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';
import { CommentSerializer } from '../../comments/serializer/comment.serializer';

export class TimelineSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: CommitSerializer,
  })
  commit: CommitSerializer;

  @ApiPropertyOptional({
    type: () => [CommentSerializer],
  })
  comments: CommentSerializer[];
}
