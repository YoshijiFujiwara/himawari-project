import { Injectable } from '@nestjs/common';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalRepository } from '../goals/goal.repository';
import { GroupRepository } from '../groups/group.repository';
import { GoalLabelEnum } from '../goals/goal-label.enum';

@Injectable()
export class SearchesService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
  ) {}

  async searchInGroupRelatedUsers(
    user: UserEntity,
  ): Promise<{ users: UserEntity[]; goals: GoalEntity[] }> {
    const groups = await this.groupRepository.getGroupsUserMemberOf(user);

    // 同じグループのユーザーを取得
    const allUsers: UserEntity[] = [].concat(
      ...groups.map(group => group.users),
    );
    const uniqueUsers = allUsers.filter(
      (filteringUser, index) =>
        allUsers.findIndex(u => u.id === filteringUser.id) === index,
    );

    const goals = await this.goalRepository
      .createQueryBuilder('goal')
      .where('goal.user_id IN (:users)', {
        users: uniqueUsers.map(uu => uu.id),
      })
      .leftJoinAndSelect('goal.user', 'user') // ユーザーネームも一応欲しいため
      .getMany();

    return {
      users: uniqueUsers,
      goals,
    };
  }

  async getUsers(user: UserEntity): Promise<UserEntity[]> {
    const users = [];

    for (let index = 0; index < 100; index++) {
      const newUser = new UserEntity();
      newUser.id = index;
      newUser.username = `test${index}`;
      newUser.email = `test${index}@gmail.com`;
      newUser.password = 'hogehoge';
      newUser.createdAt = new Date();
      users.push(newUser);
    }

    return users;
  }

  async getGoals(user: UserEntity): Promise<GoalEntity[]> {
    const goals = [];

    for (let index = 0; index < 100; index++) {
      const newGoal = new GoalEntity();
      newGoal.id = index;
      newGoal.title = `目標${index}`;
      newGoal.description = 'fugafuga';
      newGoal.label = GoalLabelEnum.CHALLENGING;
      newGoal.isPublic = false;
      newGoal.userId = 1;
      newGoal.user = user;
      delete newGoal.user.groups;
      newGoal.lastCommitedAt = new Date();
      newGoal.createdAt = new Date();
      goals.push(newGoal);
    }

    return goals;
  }
}
