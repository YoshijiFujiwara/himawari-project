import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { UserRepository } from '../auth/user.repository';
import { GoalRepository } from '../goals/goal.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
  ) {}

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const isValidEmail = this.userRepository.isValidEmail({
      email: user.email,
    });
    if (!isValidEmail) {
      throw new NotFoundException();
    }

    return user;
  }

  async getGoalsOfUser(userId: number): Promise<GoalEntity[]> {
    return await this.goalRepository.find({
      where: {
        userId,
        isPublic: true,
      },
    });
  }
}
