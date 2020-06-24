import { EntityRepository, Repository } from 'typeorm';
import { CommitEntity } from './commit.entity';
import { CreateCommitDto } from './dto/create-commit.dto';
import { GoalEntity } from '../goals/goal.entity';
import { UserEntity } from '../auth/user.entity';
<<<<<<< HEAD
import { CommitsSummary } from './interface/commits-summary.interface';
=======
>>>>>>> 6ab3144f403bd3b618114b7d18c9bd1b81affd79

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

  async getCommitsByUser(user: UserEntity): Promise<CommitEntity[]> {
    return await this.createQueryBuilder('commit')
      .leftJoinAndSelect('commit.goal', 'goal')
      .where('goal.user_id = :userId', { userId: user.id })
      .orderBy('created_at', 'DESC')
      .getMany();
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
