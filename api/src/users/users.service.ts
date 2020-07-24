import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { UserRepository } from '../auth/user.repository';
import { GoalRepository } from '../goals/goal.repository';
import { CommitRepository } from '../commits/commit.repository';
import { MonthlyCount } from 'src/commits/interface/monthly-count.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
    @InjectRepository(CommitRepository)
    private commitRepository: CommitRepository,
  ) {}

  async getUser(userId: number): Promise<UserEntity> {
    return await this.findUser(userId);
  }

  async getGoalsOfUser(userId: number): Promise<GoalEntity[]> {
    // メールアドレスなどのチェックのため
    // まあ、メール確認出来ていない状態で、目標は作れないのだが
    // そのロジックに依存するのはよくない
    const user = await this.findUser(userId);
    return await this.goalRepository.find({
      where: {
        userId: user.id,
        isPublic: true,
      },
    });
  }

  async getMonthlyCountByUser(userId: number): Promise<MonthlyCount[]> {
    const user = await this.findUser(userId);
    return await this.commitRepository.getMonthlyCountByUser(user);
  }

  private async findUser(userId: number): Promise<UserEntity> {
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
}
