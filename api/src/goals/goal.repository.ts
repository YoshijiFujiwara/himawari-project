import { EntityRepository, Repository } from 'typeorm';
import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserEntity } from '../auth/user.entity';

@EntityRepository(GoalEntity)
export class GoalRepository extends Repository<GoalEntity> {
  async createGoal({ title, description }: CreateGoalDto, user: UserEntity) {
    return {
      msg: 'これが返ってきたらOK!',
      title,
      description,
      user,
    };
  }
}
