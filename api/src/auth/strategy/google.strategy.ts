import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
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

    // 既存ユーザーかどうかをemailでチェック
    // 既存ユーザーの場合は、usernameでJWTを生成する感じだーね

    // 新規のユーザーの場合は、
    // - famityName + givenNameでusernameを組み立てる
    // - usernameの重複チェックをする
    //   - 重複した場合は、usernameの後ろにランダムnumberでもくっつけるか（後々、よりいい方法にしたいお気持ち）
    //     - 本当は、usernameの再設定ページに飛ばして、usernameだけ入力してもらうのがいいんだろうけれども、
    //       usernameが完全に重複するケースは後々ユーザーが増えてから考えても、間に合う問題な気はしているので、後回しでもいいかもしれない

    const user = {
      username: `${name.familyName}${name.givenName}`,
      email: emails[0].value,
      accessToken,
    };
    done(null, user);
  }
}
