import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { UserRepository } from '../auth/user.repository';
import { GoalRepository } from '../goals/goal.repository';
import { CommitRepository } from '../commits/commit.repository';
import { MonthlyCount } from '../commits/interface/monthly-count.interface';
import { CommitsSummary } from '../commits/interface/commits-summary.interface';
import { MonthlyGoalCommitSummary } from '../goals/interface/month-goal-commit-summary.interface';
import { format } from 'date-fns';

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

  async getSummaryByUser(userId: number): Promise<CommitsSummary> {
    const user = await this.findUser(userId);
    const totalTime = await this.commitRepository.getTotalTimeByUser(user);
    const totalCount = await this.commitRepository.getTotalCommitsCountByUser(
      user,
    );
    return {
      totalTime,
      totalCount,
    };
  }

  async getGoalCommitMonthlySummary(
    userId: number,
  ): Promise<MonthlyGoalCommitSummary> {
    const user = await this.findUser(userId);

    // 月ごとに新規作成された目標を取得する
    const goals = await this.goalRepository.find({
      relations: [],
      where: {
        userId: user.id,
        isPublic: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    const goalsGroupByMonth = goals.reduce((acc, current) => {
      const month = format(new Date(current.createdAt), 'yyyy-MM');
      if (month in acc) {
        acc[month].createdGoals.push(current);
      } else {
        acc[month] = {
          createdGoals: [current],
        };
      }
      return acc;
    }, {});

    // 月ごとに目標ごとの学習記録数を取得する(公開目標のみ)
    const commits = await this.commitRepository.getCommitsByUser(user, true);
    const commitsGroupByMonth = commits.reduce((acc, current) => {
      const month = format(new Date(current.createdAt), 'yyyy-MM');
      if (month in acc && current.goalId in acc[month]) {
        acc[month][current.goalId].count = acc[month][current.goalId].count + 1;
      } else if (!(month in acc)) {
        acc[month] = {
          [current.goalId]: {
            goalTitle: goals.find(g => g.id === current.goalId).title,
            count: 1,
          },
        };
      } else if (!(current.goalId in acc[month])) {
        acc[month] = {
          ...acc[month],
          [current.goalId]: {
            goalTitle: goals.find(g => g.id === current.goalId).title,
            count: 1,
          },
        };
      }
      return acc;
    }, goalsGroupByMonth);

    return commitsGroupByMonth;
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
