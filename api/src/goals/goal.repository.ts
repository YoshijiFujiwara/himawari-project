import { EntityRepository, Repository, Brackets } from 'typeorm';
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

  async getGoal(id: number, user: UserEntity): Promise<GoalEntity> {
    const goalEntity = await this.findOne({
      relations: ['user'],
      where: [
        { id, userId: user.id },
        { id, isPublic: true },
      ],
    });

    return goalEntity;
  }
}
