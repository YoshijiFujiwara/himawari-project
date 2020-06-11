import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AccessTokenDto } from './dto/access-token.dto';
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
    const user = await this.userRepository.createUser(signUpUserDto);
    await this.sendMailVerifyToken(user);
  }

  async sendMailVerifyToken(user: UserEntity): Promise<void> {
    const { username, email } = user;
    try {
      this.mailerService.sendMail({
        to: email,
        from: 'noreply@nestjs.com', // sender address
        subject: `[Project] メールを確認してください '${email}'`, // Subject line
        text: `${username}様\n本登録を完了してください。\n[本登録用URL(トークン:${username})]`, // plaintext body
        html: `<b>${username}様</b><br>本登録を完了してください。<br>[本登録用URL(トークン:${username})]`, // HTML body content
      });
    } catch (err) {
      if (err.code === 'EAUTH') {
        throw new InternalServerErrorException('mailtrap error');
      }
    }
  }

  async mailVerify(token: string): Promise<UserEntity> {
    const user = await this.userRepository.verifyToken(token);
    if (!user) {
      throw new NotFoundException('無効なトークンです');
    }
    return user;
  }

  async signIn(signInUserDto: SignInUserDto): Promise<AccessTokenDto> {
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
