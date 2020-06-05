import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto

    const user = await (username === undefined) ? this.userRepository.getUserByEmail(email) : this.userRepository.getUserByUsername(username);

    await this.userRepository.passwordVerification(password, user);

    const payload = { username }
    return {
      'access_token': this.jwtService.sign(payload)
    }
  }
}
