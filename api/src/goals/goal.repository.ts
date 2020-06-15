import { EntityRepository, Repository } from 'typeorm';
import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserEntity } from '../auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

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
    goal.userId = user.id;
    try {
      await goal.save();
      return goal;
    } catch (err) {
      throw new InternalServerErrorException('DB書き込みエラー');
    }
  }
}
