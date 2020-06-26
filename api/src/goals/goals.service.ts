import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getGoals(user: UserEntity): Promise<GoalEntity[]> {
    return await this.goalRepository.find({
      relations: ['commits'],
      where: { userId: user.id },
    });
  }

  async getGoal(id: number, user: UserEntity): Promise<GoalEntity> {
    const goal = await this.goalRepository.findOne({
      relations: ['user', 'commits'],
      where: [
        { id, userId: user.id },
        { id, isPublic: true },
      ],
    });

    if (!goal) {
      throw new NotFoundException('存在しないIDです');
    }
    return goal;
  }
}
