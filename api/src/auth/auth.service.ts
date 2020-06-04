import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthSerializer } from './auth.serializer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<AuthSerializer> {
    return await this.userRepository.createUser(createUserDto);
  }
}
