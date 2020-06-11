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

export const transformToSerializer = (
  userEntity: UserEntity,
): UserSerializer => {
  const { id, username, email } = userEntity;
  const userSerializer = new UserSerializer();
  userSerializer.id = id;
  userSerializer.username = username;
  userSerializer.email = email;

  return userSerializer;
};
