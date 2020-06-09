import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user.repository';
import { randomBytes } from 'crypto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly jwtService: JwtService,
    private userRepository: UserRepository,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'https://himawari.dev/api/auth/google/callback', // TODO: 環境変数化
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const email = emails[0].value;

    const existingUser = await this.userRepository.findOne({ email });

    if (existingUser) {
      const jwt = await this.jwtService.signAsync({
        username: existingUser.username,
      });
      done(null, { jwt });
    } else {
      // usernameの重複チェックをする
      let username = `${name.familyName}${name.givenName}`;
      const duplicatedUser = await this.userRepository.findOne({ username });
      if (duplicatedUser) {
        username += `_${randomBytes(4).toString('hex')}`;
      }
      // ユーザーの新規登録
      await this.userRepository.createUserBySocialSignin({
        username,
        email,
        thirdPartyId: 'hogehoge', // TODO: dummy string
        authProvider: 'google', // TODO: 確認する
      });
      const jwt = await this.jwtService.signAsync({
        username,
      });
      done(null, { jwt });
    }
  }
}
