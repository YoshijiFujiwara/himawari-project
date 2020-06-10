import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SingInUserDto } from './dto/sign-in-user.dto';
import * as bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(signUpUserDto: SignUpUserDto): Promise<void> {
    const { username, email, password } = signUpUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    try {
      await user.save();
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('ユーザー名またはパスワードが違います');
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
      user.is_mail_verified = true;
      await user.save();
      return user;
    }

    return null;
  }

  async validatePassword(signInUserDto: SingInUserDto): Promise<string> {
    const { username, email, password } = signInUserDto;
    if ((!username && !email) || !password) {
      return null;
    }

    const query = this.createQueryBuilder('users');
    if (username) {
      query.where('users.username = :username', { username });
    } else {
      query.where('users.email = :email', { email });
    }
    const user = await query
      .andWhere('users.is_mail_verified = :is_mail_verified', {
        is_mail_verified: true,
      })
      .getOne();

    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username;
    }
    return null;
  }
}
