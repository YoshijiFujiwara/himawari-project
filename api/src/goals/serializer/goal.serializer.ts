import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSerializer } from '../../auth/serializer/user.serializer';
import { CommitSerializer } from '../../commits/serializer/commit.serializer';
import { GoalLabelEnum } from '../goal-label.enum';

export class GoalSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    enum: GoalLabelEnum,
  })
  label: GoalLabelEnum;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  lastCommitedAt: Date;

  @ApiProperty()
  createdAt: Date;

  // commitsを取得した時に格納する
  @ApiPropertyOptional()
  totalTime?: string;

  @ApiPropertyOptional({
    type: () => UserSerializer,
  })
  user: UserSerializer;

  @ApiPropertyOptional({
    type: () => [CommitSerializer],
  })
  commits: CommitSerializer[];
}
