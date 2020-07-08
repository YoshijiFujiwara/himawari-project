import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GroupSerializer } from '../../groups/serializer/group.serializer';

export class UserSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  avatarUrl?: string;

  @ApiPropertyOptional()
  statusMessage?: string;

  @ApiPropertyOptional({
    type: [GroupSerializer],
  })
  groups: GroupSerializer[];
}
