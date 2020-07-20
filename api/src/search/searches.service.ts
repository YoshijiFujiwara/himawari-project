import { Injectable } from '@nestjs/common';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalRepository } from '../goals/goal.repository';
import { GroupRepository } from '../groups/group.repository';

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
    const users = [];

    // 同じグループのユーザーを取得
    for (const group of groups) {
      for (const user of group.users) {
        // 重複無効
        if (!users.find(u => u.id === user.id)) {
          users.push(user);
        }
      }
    }

    const goals = await this.goalRepository.find({ userId: user.id });
    goals.map(g => delete g.commits);

    return {
      users,
      goals,
    };
  }
}
