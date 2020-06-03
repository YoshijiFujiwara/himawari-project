import { ApiProperty } from '@nestjs/swagger';

export class AuthSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
