import { ApiProperty } from '@nestjs/swagger';

export class UserSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
