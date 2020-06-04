import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserSerializer } from './user.serializer';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserSerializer> {
    const { username, email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    await user.save();

    const retUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return retUser;
  }
}
