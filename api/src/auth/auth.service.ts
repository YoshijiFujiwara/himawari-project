import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from './user.entity';
import { AccessTokenSerializer } from './serializer/access-token.serializer';
import { UpdateMeDto } from './dto/update-me.dto';

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
    await this.sendAuthenticationEmail(user);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<AccessTokenSerializer> {
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

  async updateMe(
    me: UserEntity,
    updateMeDto: UpdateMeDto,
  ): Promise<{
    me: UserEntity;
    accessToken: string;
  }> {
    // usernameが他の人に使われていないかチェック
    const isDupulicated = await this.isDupulicatedUsername(
      me,
      updateMeDto.username,
    );
    if (isDupulicated) {
      throw new ConflictException(
        'このユーザー名は他のユーザーに使用されています。他のユーザー名をお試しください。',
      );
    }

    me.username = updateMeDto.username;
    if (updateMeDto.avatarUrl) {
      me.avatarUrl = updateMeDto.avatarUrl;
    }
    me.statusMessage = updateMeDto.statusMessage;

    me.save();

    // usernameが変更されていた場合、次回からログインが出来なくなってしまうので新しいjwtトークンを返却する
    const payload: JwtPayload = {
      username: me.username,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      me,
      accessToken,
    };
  }

  async sendAuthenticationEmail({
    id,
    username,
    email,
  }: UserEntity): Promise<void> {
    // 間違ったメールアドレスにusernameを露出させたくないのでidにする
    // id単体ではusernameより安全であろう
    const token = await this.jwtService.signAsync({ id });
    const url = `${process.env.CLIENT_URL}/auth/email_confirmation?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@nestjs.com',
      subject: `[Project] メールを確認してください '${email}'`,
      template: 'completeRegistration',
      context: {
        url,
        username,
      },
    });
  }

  async verifyEmail(token: string): Promise<void> {
    const decoded = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOne({ id: decoded.id });
    if (!user) {
      throw new NotFoundException('無効なトークンです');
    }
    if (user.isEmailVerified) {
      throw new BadRequestException('すでにメール認証されています');
    }
    user.isEmailVerified = true;
    await user.save();
  }

  private async isDupulicatedUsername(me, username): Promise<boolean> {
    const duplicatedUser = await this.userRepository.findOne({
      username,
    });
    return !!duplicatedUser && duplicatedUser.id !== me.id;
  }
}
