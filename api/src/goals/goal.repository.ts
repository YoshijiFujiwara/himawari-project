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
    const goal = await this.createQueryBuilder('goals')
      .where('goals.id = :id', { id })
      .andWhere(
        new Brackets(qb => {
          qb.orWhere(
            'goals.is_public = true',
          ).orWhere('goals.user_id = :userId', { userId: user.id });
        }),
      )
      .getOne();

    if (goal) {
      return goal;
    }
    return null;
  }
}
