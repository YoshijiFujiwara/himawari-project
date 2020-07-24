import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MonthlyCount } from '../commits/interface/monthly-count.interface';
import { UserSerializer } from '../auth/serializer/user.serializer';
import { GoalSerializer } from '../goals/serializer/goal.serializer';
import { UsersService } from './users.service';
import { CommitsSummary } from 'src/commits/interface/commits-summary.interface';
import { MonthlyGoalCommitSummary } from 'src/goals/interface/month-goal-commit-summary.interface';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({
    description: '他人の基本情報を取得する',
    type: UserSerializer,
  })
  async getUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserSerializer> {
    const user = await this.usersService.getUser(userId);
    return user.transformToSerializer();
  }

  @Get(':id/goals')
  @ApiOkResponse({
    description: '他人の公開目標一覧を取得する',
    type: [GoalSerializer],
  })
  async getGoalsOfUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GoalSerializer[]> {
    const goals = await this.usersService.getGoalsOfUser(userId);
    return goals.map(g => g.transformToSerializer());
  }

  @Get(':id/commits/summary/monthly')
  @ApiOkResponse({
    description: '他人の月単位での全学習記録数の取得',
    type: [MonthlyCount],
  })
  async getMonthlyCountByUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<MonthlyCount[]> {
    return await this.usersService.getMonthlyCountByUser(userId);
  }

  @Get(':id/commits/summary/total')
  @ApiOkResponse({
    description: '他人の累計学習時間と累計学習記録数の取得',
    type: CommitsSummary,
  })
  async getCommitSummaryByUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<CommitsSummary> {
    return await this.usersService.getSummaryByUser(userId);
  }

  @Get(':id/goals/summary/monthly')
  @ApiOkResponse({
    description: '目標と学習記録の月ごとのサマリーを取得する（公開目標のみ）',
    type: Object,
  })
  async getGoalCommitMonthlySummary(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<MonthlyGoalCommitSummary> {
    return this.usersService.getGoalCommitMonthlySummary(userId);
  }
}
