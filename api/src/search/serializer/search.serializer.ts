import { ApiProperty } from '@nestjs/swagger';
import { UserSerializer } from '../../auth/serializer/user.serializer';
import { GoalSerializer } from '../../goals/serializer/goal.serializer';

export class SearchSerializer {
  @ApiProperty({
    type: () => [UserSerializer],
  })
  users: UserSerializer[];

  @ApiProperty({
    type: () => [GoalSerializer],
  })
  goals: GoalSerializer[];
}
