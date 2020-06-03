import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository()
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, email, password } = createUserDto;

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();

    return user;
  }
}
