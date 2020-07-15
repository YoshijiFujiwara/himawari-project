import { EntityRepository, Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(GroupEntity)
export class GroupRepository extends Repository<GroupEntity> {
  async createGroup(
    { name }: CreateGroupDto,
    user: UserEntity,
  ): Promise<GroupEntity> {
    const group = new GroupEntity();
    group.name = name;
    group.users = [user];
    await group.save();

    return group;
  }

  async inviteUser(id: number, user: UserEntity): Promise<GroupEntity> {
    const group = await this.findOne({ relations: ['users'], where: { id } });
    group.users = [...group.users, user];
    await group.save();

    return group;
  }

  async assignGoal(id: number, goal: GoalEntity): Promise<GroupEntity> {
    const group = await this.findOne({ relations: ['goals'], where: { id } });
    group.goals = [...group.goals, goal];
    try {
    await group.save();
    return group;
    } catch(err) {
      console.log({err})
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'この目標は、すでにグループに登録されています'
        )
      }
              throw new InternalServerErrorException();
  }

  /**
   * ユーザーが参加しているグループ一覧を取得
   */
  async getGroupsUserMemberOf(user: UserEntity): Promise<GroupEntity[]> {
    return await this.find({
      join: { alias: 'groups', innerJoin: { users: 'groups.users' } },
      relations: ['users'],
      where: qb => {
        qb.where('users.id = :userId', { userId: user.id });
      },
    });
  }

  /**
   * 目標に紐付いているグループ一覧を取得
   */
  async getGroupsAssignGoalOf({
    id: goalId,
  }: GoalEntity): Promise<GroupEntity[]> {
    return await this.find({
      join: { alias: 'groups', innerJoin: { goals: 'groups.goals' } },
      relations: ['goals'],
      where: qb => {
        qb.where('goals.id = :goalId', { goalId });
      },
    });
  }
}
