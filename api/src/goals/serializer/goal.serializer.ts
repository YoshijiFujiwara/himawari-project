import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSerializer } from '../../auth/serializer/user.serializer';

export class GoalSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  user: UserSerializer;
}
