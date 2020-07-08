import { ApiProperty } from '@nestjs/swagger';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';

export class CommitTimelineSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: CommitSerializer,
  })
  commit: CommitSerializer;
}
