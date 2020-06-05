import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    try {
      await user.save();
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({
          code: err.code,
          message: err.sqlMessage,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const query = this.createQueryBuilder('users');

    query.andWhere('users.email = :email', { email });

    try {
      const user = await query.getOne();
      return user;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const query = this.createQueryBuilder('users');

    query.andWhere('users.username = :username', { username });

    try {
      const user = await query.getOne();
      return user;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async passwordVerification(
    password: string,
    user: Promise<UserEntity>,
  ): Promise<void> {
    if (!bcrypt.compare(password, (await user).password)) {
      throw new UnauthorizedException();
    }
  }
}
