import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalRepository } from './goal.repository';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from './goal.entity';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';
import { format } from 'date-fns';
import { CommitRepository } from '../commits/commit.repository';
import { MonthlyGoalCommitSummary } from './interface/month-goal-commit-summary.interface';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
    @InjectRepository(CommitRepository)
    private commitRepository: CommitRepository,
    @InjectRepository(TimelineRepository)
    private timelineRepository: TimelineRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async getSummary(user: UserEntity): Promise<MonthlyGoalCommitSummary> {
    // 月ごとに新規作成された目標を取得する
    const goals = await this.goalRepository.find({
      relations: [],
      where: {
        userId: user.id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    const goalsGroupByMonth = goals.reduce((acc, current) => {
      const month = format(new Date(current.createdAt), 'yyyy-MM');
      if (month in acc) {
        acc[month].createdGoals.push(current);
      } else {
        acc[month] = {
          createdGoals: [current],
        };
      }
      return acc;
    }, {});

    // 月ごとに目標ごとの学習記録数を取得する
    const commits = await this.commitRepository.getCommitsByUser(user);
    const commitsGroupByMonth = commits.reduce((acc, current) => {
      const month = format(new Date(current.createdAt), 'yyyy-MM');
      if (month in acc && current.goalId in acc[month]) {
        acc[month][current.goalId].count = acc[month][current.goalId].count + 1;
      } else if (!(month in acc)) {
        acc[month] = {
          [current.goalId]: {
            goalTitle: goals.find(g => g.id === current.goalId).title,
            count: 1,
          },
        };
      } else if (!(current.goalId in acc[month])) {
        acc[month] = {
          ...acc[month],
          [current.goalId]: {
            goalTitle: goals.find(g => g.id === current.goalId).title,
            count: 1,
          },
        };
      }
      return acc;
    }, goalsGroupByMonth);

    return commitsGroupByMonth;
  }

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
      order: { lastCommitedAt: 'DESC' },
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

  async updateGoal(
    goalId: number,
    updateGoalDto: UpdateGoalDto,
    user: UserEntity,
  ): Promise<GoalEntity> {
    const goal = await this.goalRepository.findOne({
      where: { id: goalId, userId: user.id },
    });
    if (!goal) {
      throw new NotFoundException('目標が見つかりませんでした');
    }

    const isLabelUpdated = goal.label !== updateGoalDto.label;
    const fromLabel = goal.label;
    const toLabel = updateGoalDto.label;

    goal.title = updateGoalDto.title;
    goal.description = updateGoalDto.description;
    goal.isPublic = updateGoalDto.isPublic;
    goal.label = updateGoalDto.label;
    await goal.save();

    // ラベル（ステータス）が更新された場合、タイムラインに共有する
    if (isLabelUpdated) {
      const assignGroups = await this.groupRepository.getGroupsAssignGoalOf(
        goal,
      );
      this.timelineRepository.shareGoalInTimeline(
        goal,
        assignGroups,
        fromLabel,
        toLabel,
      );
    }
    return goal;
  }
}
