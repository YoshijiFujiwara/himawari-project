import { ApiProperty } from '@nestjs/swagger';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';

export class TimelineSerializer {
  @ApiProperty()
  type: string;

  @ApiProperty()
  content: CommitSerializer;
}
