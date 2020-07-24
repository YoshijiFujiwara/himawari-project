import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { CommitEntity } from './commit.entity';
import { CreateCommitDto } from './dto/create-commit.dto';
import { GoalEntity } from '../goals/goal.entity';
import { UserEntity } from '../auth/user.entity';
import { MonthlyCount } from './interface/monthly-count.interface';

@EntityRepository(CommitEntity)
export class CommitRepository extends Repository<CommitEntity> {
  async createCommit(
    { title, description, studyHours, studyMinutes }: CreateCommitDto,
    goal: GoalEntity,
  ) {
    const commit = new CommitEntity();
    commit.title = title;
    commit.description = description;
    commit.studyTime = `${studyHours}:${studyMinutes}`;
    commit.goal = goal;
    await commit.save();

    delete commit.goal;
    return commit;
  }

  async getCommitsByUser(
    user: UserEntity,
    onlyPublic: boolean = false,
  ): Promise<CommitEntity[]> {
    return await this.createQueryByUser(user, onlyPublic)
      .orderBy('commit.created_at', 'DESC')
      .getMany();
  }

  async getMonthlyCountByUser(user: UserEntity): Promise<MonthlyCount[]> {
    return await this.createQueryByUser(user)
      .select([
        'DATE_FORMAT(commit.created_at, "%Y-%m") as createdAt',
        'COUNT(*) as count',
      ])
      .groupBy('createdAt')
      .getRawMany();
  }

  async getTotalTimeByUser(user: UserEntity): Promise<string> {
    const result = await this.createQueryByUser(user)
      .select('sec_to_time(sum(time_to_sec(commit.study_time))) as totalTime')
      .getRawOne();

    return result.totalTime;
  }

  async getTotalCommitsCountByUser(user: UserEntity): Promise<number> {
    return await this.createQueryByUser(user).getCount();
  }

  createQueryByUser(
    user: UserEntity,
    onlyPublic: boolean = false,
  ): SelectQueryBuilder<CommitEntity> {
    const query = this.createQueryBuilder('commit')
      .leftJoinAndSelect('commit.goal', 'goal')
      .where('goal.user_id = :userId', { userId: user.id });
    return onlyPublic ? query.andWhere('goal.is_public = true') : query;
  }
}
