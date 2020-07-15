import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';
import { ReactionSerializer } from '../../reactions/serializer/reaction.serializer';

export class TimelineSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: CommitSerializer,
  })
  commit: CommitSerializer;

  @ApiPropertyOptional({
    type: () => [ReactionSerializer],
  })
  reactions: ReactionSerializer[];
}
