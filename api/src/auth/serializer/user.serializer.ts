import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';
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

  @ApiPropertyOptional({
    type: [GoalSerializer],
  })
  goals: GoalSerializer[];
}
