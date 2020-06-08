import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { SingInUserDto } from './dto/sign-in-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AccessToken } from './interface/access-token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto): Promise<void> {
    return this.userRepository.createUser(signUpUserDto);
  }

  async signIn(signInUserDto: SingInUserDto): Promise<AccessToken> {
    const payload: JwtPayload = await this.userRepository.validatePassword(
      signInUserDto,
    );

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
