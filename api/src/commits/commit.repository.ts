import { EntityRepository, Repository } from 'typeorm';
import { CommitEntity } from './commit.entity';
import { CreateCommitDto } from './dto/create-commit.dto';
import { GoalEntity } from '../goals/goal.entity';
import { UserEntity } from '../auth/user.entity';
import { CommitsSummary } from './interface/commits-summary.interface';

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

  async getCommitsSummaryByUser(user: UserEntity): Promise<CommitsSummary[]> {
    return await this.createQueryBuilder('commit')
      .leftJoinAndSelect('commit.goal', 'goal')
      .where('goal.user_id = :userId', { userId: user.id })
      .select([
        'DATE_FORMAT(commit.created_at, "%Y-%m") as createdAt',
        'COUNT(*) as count',
      ])
      .groupBy('createdAt')
      .getRawMany();
  }
}
