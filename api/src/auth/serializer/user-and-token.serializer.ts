import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSerializer } from './user.serializer';

export class UserAndTokenSerializer {
  @ApiProperty()
  me: UserSerializer;

  @ApiProperty()
  accessToken: string;
}
