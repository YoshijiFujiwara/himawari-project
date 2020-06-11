import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import * as bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser({
    username,
    email,
    password,
  }: SignUpUserDto): Promise<void> {
    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    try {
      await user.save();
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'ユーザー名またはメールアドレスがすでに使われています',
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
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'ユーザー名またはメールアドレスがすでに使われています',
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async validatePassword(signInUserDto: SignInUserDto): Promise<string> {
    const { username, email, password } = signInUserDto;
    const user =
      (await this.findOne({ username })) || (await this.findOne({ email }));

    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username;
    }
    return null;
  }
}
