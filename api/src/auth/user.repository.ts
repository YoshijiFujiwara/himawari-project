import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SingInUserDto } from './dto/sign-in-user.dto';
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

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.findOne({ email });
      return user;
    } catch (err) {
      throw new NotFoundException('ユーザー名またはパスワードが違います');
    }
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    try {
      const user = await this.findOne({ username });
      return user;
    } catch (err) {
      throw new NotFoundException('ユーザー名またはパスワードが違います');
    }
  }

  async validatePassword(
    signInUserDto: SingInUserDto,
  ): Promise<{ email: string } | { username: string }> {
    const { username, email, password } = signInUserDto;

    if (!username && !email) {
      throw new UnauthorizedException(
        'ユーザー名またはパスワードが違います',
      );
    }

    if (!password) {
      throw new UnauthorizedException('ユーザー名またはパスワードが違います');
    }

    const payload = username === undefined ? { email } : { username };

    const user =
      username === undefined
        ? this.getUserByEmail(email)
        : this.getUserByUsername(username);

    if (!bcrypt.compare(password, (await user).password)) {
      throw new UnauthorizedException('ユーザー名またはパスワードが違います');
    }

    return payload;
  }
}
