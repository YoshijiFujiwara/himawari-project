import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommitRepository } from './commit.repository';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UserEntity } from '../auth/user.entity';
import { GoalRepository } from '../goals/goal.repository';
import { CommitEntity } from './commit.entity';
import { MonthlyCount } from './interface/monthly-count.interface';
import { CommitsSummary } from './interface/commits-summary.interface';

@Injectable()
export class CommitsService {
  constructor(
    @InjectRepository(CommitRepository)
    private commitRepository: CommitRepository,
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
  ) {}

  async createCommit(
    createCommitDto: CreateCommitDto,
    goalId: number,
    user: UserEntity,
  ): Promise<CommitEntity> {
    const goalEntity = await this.goalRepository.findOne({
      relations: ['user'],
      where: [{ id: goalId, userId: user.id }],
    });
    if (!goalEntity) {
      throw new NotFoundException('存在しないIDです');
    }

    const commitEntity = await this.commitRepository.createCommit(
      createCommitDto,
      goalEntity,
    );
    return commitEntity;
  }

  async getCommits(user: UserEntity): Promise<CommitEntity[]> {
    return await this.commitRepository.getCommitsByUser(user);
  }

  async getMonthlyCountByUser(user: UserEntity): Promise<MonthlyCount[]> {
    return await this.commitRepository.getMonthlyCountByUser(user);
  }

  async getSummaryByUser(user: UserEntity): Promise<CommitsSummary> {
    const totalTime = await this.commitRepository.getTotalTimeByUser(user);
    const totalCount = await this.commitRepository.getTotalCommitsCountByUser(
      user,
    );

    return {
      totalTime,
      totalCount,
    };
  }

  async deleteCommit(id: number, user: UserEntity): Promise<void> {
    const commit = await this.commitRepository.findOne({
      relations: ['goal'],
      where: { id },
    });
    if (!commit || commit.goal.userId !== user.id) {
      throw new NotFoundException('存在しない学習記録です');
    }

    await this.commitRepository.delete({ id });
  }
}
