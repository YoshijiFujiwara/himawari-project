import { EntityRepository, Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository()
export class AuthRepository extends Repository<AuthEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<AuthEntity> {
    const { username, email, password } = createUserDto;

    const user = new AuthEntity();
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();

    return user;
  }
}
