import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import * as bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser({
    username,
    email,
    password,
  }: SignUpUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'ユーザー名またはメールアドレスが登録済みです',
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async createUserBySocialSignin({
    username,
    email,
    thirdPartyId,
    authProvider,
  }: {
    username: string;
    email: string;
    thirdPartyId: string;
    authProvider: string;
  }) {
    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.thirdPartyId = thirdPartyId;
    user.authProvider = authProvider;

    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'ユーザー名またはメールアドレスがすでに使われています',
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async verifyToken(token: string): Promise<UserEntity> {
    if (!token) {
      return null;
    }

    const user = await this.findOne({
      username: token,
    });

    if (user) {
      user.isEmailVerified = true;
      await user.save();
      return user;
    }
    return null;
  }

  async validatePassword({
    username,
    email,
    password,
  }: SignInUserDto): Promise<string> {
    if ((!username && !email) || !password) {
      return null;
    }

    const user =
      (await this.findOne({ username })) || (await this.findOne({ email }));
    if (user && !user.isEmailVerified) {
      throw new UnauthorizedException('メール確認が出来ておりません');
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username;
    }
    return null;
  }
}
