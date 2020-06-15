import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalRepository } from './goal.repository';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
  ) {}

  async createGoal(createGoalDto: CreateGoalDto, user: UserEntity) {
    return this.goalRepository.createGoal(createGoalDto, user);
  }
}
