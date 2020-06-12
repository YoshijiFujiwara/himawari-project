import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenSerializer {
  @ApiProperty()
  accessToken: string;
}
