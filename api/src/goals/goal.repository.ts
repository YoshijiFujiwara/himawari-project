import { EntityRepository, Repository } from 'typeorm';
import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserEntity } from '../auth/user.entity';

@EntityRepository(GoalEntity)
export class GoalRepository extends Repository<GoalEntity> {
  async createGoal(
    { title, description, isPublic }: CreateGoalDto,
    user: UserEntity,
  ): Promise<GoalEntity> {
    const goal = new GoalEntity();
    goal.title = title;
    goal.description = description;
    goal.isPublic = isPublic;
    goal.user = user;
    await goal.save();

    delete goal.user; // フロントにユーザー情報を返す必要が無い
    return goal;
  }

  async updateLastCommitedAt({ id }: GoalEntity): Promise<GoalEntity> {
    const goal = await this.findOne({ id });
    goal.lastCommitedAt = new Date();
    goal.save();

    return goal;
  }
}
