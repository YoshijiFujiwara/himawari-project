import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto

    const user = await (username === undefined) ? this.userRepository.getUserByEmail(email) : this.userRepository.getUserByUsername(username);

    await this.userRepository.passwordVerification(password, user);

    // 成功すればjwtによるaccess_tokenを発行。

  }
}
