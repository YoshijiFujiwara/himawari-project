import { ApiProperty } from '@nestjs/swagger';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';

export class TimelineSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: CommitSerializer,
  })
  commit: CommitSerializer;
}
