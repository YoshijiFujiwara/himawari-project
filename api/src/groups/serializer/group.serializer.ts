import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSerializer } from '../auth/serializer/user.serializer';

export class GroupSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({
    type: UserSerializer,
  })
  owner: UserSerializer;
}
