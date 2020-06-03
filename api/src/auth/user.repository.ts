import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    await user.save();

    return user;
  }
}
