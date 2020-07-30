import { Injectable } from '@nestjs/common';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalRepository } from '../goals/goal.repository';
import { GroupRepository } from '../groups/group.repository';
import { UserRepository } from '../auth/user.repository';
import { SearchDto } from './dto/search.dto';
import { Like } from 'typeorm';

@Injectable()
export class SearchesService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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
    const allUsers: UserEntity[] =
      groups.length !== 0
        ? [].concat(...groups.map(group => group.users))
        : [user];
    const uniqueUsers = allUsers.filter(
      (filteringUser, index) =>
        allUsers.findIndex(u => u.id === filteringUser.id) === index,
    );

    const goals = await this.goalRepository
      .createQueryBuilder('goal')
      .where('goal.user_id IN (:users)', {
        users: uniqueUsers.map(uu => uu.id),
      })
      .andWhere('goal.isPublic = true')
      .orWhere('goal.user_id = :userId', { userId: user.id })
      .leftJoinAndSelect('goal.user', 'user') // ユーザーネームも一応欲しいため
      .getMany();

    return {
      users: uniqueUsers,
      goals,
    };
  }

  async getUsers({ keyword }: SearchDto): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: ['goals'],
      where: {
        username: Like(`%${keyword}%`),
      },
    });
  }

  async getGoals({ keyword }: SearchDto): Promise<GoalEntity[]> {
    return await this.goalRepository
      .createQueryBuilder('goal')
      .where('goal.title LIKE :title', { title: `%${keyword}%` })
      .andWhere('goal.isPublic = true')
      .leftJoinAndSelect('goal.user', 'user')
      .leftJoinAndSelect('goal.commits', 'commits')
      .getMany();
  }
}
