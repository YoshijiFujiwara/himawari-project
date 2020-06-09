import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { SingInUserDto } from './dto/sign-in-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AccessToken } from './interface/access-token.type';

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
    const username = await this.userRepository.validatePassword(signInUserDto);
    if (!username) {
      throw new UnauthorizedException('ユーザー名またはパスワードが違います');
    }

    const payload: JwtPayload = {
      username,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
