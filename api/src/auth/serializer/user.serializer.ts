import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UserSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
