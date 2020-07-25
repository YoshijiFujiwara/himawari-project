import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';
import { UserSerializer } from '../../auth/serializer/user.serializer';

export class GroupSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({
    type: () => [UserSerializer],
  })
  users: UserSerializer[];

  @ApiPropertyOptional({
    type: () => [GoalSerializer],
  })
  goals: GoalSerializer[];

  @ApiProperty()
  lastTimelinePostedAt: Date;
}
