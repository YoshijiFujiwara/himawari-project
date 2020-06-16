import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalRepository } from './goal.repository';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from './goal.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
  ) {}

  async createGoal(
    createGoalDto: CreateGoalDto,
    user: UserEntity,
  ): Promise<GoalEntity> {
    return await this.goalRepository.createGoal(createGoalDto, user);
  }
}
