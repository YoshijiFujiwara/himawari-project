import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const isValidEmail = this.userRepository.isValidEmail({
      email: user.email,
    });
    if (!isValidEmail) {
      throw new NotFoundException();
    }

    return user;
  }
}
