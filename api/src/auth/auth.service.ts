import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { SingInUserDto } from './dto/sign-in-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AccessToken } from './interface/access-token.type';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto): Promise<void> {
    await this.userRepository.createUser(signUpUserDto);

    await this.example();
  }

  async example(): Promise<void> {
    const to = 'foo@gmail.com';
    const username = 'foosan';

    this.mailerService.sendMail({
      to,
      from: 'noreply@nestjs.com', // sender address
      subject: `[Project] メールを確認してください '${to}'`, // Subject line
      text: `${username}様\n本登録を完了してください。`, // plaintext body
      html: `<b>${username}様</b><br>本登録を完了してください。`, // HTML body content
    });
  }

  async mailVerify(token: string): Promise<UserEntity> {
    const user = await this.userRepository.verifyToken(token);
    if (!user) {
      throw new NotFoundException('無効なトークンです');
    }

    return user;
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
}
