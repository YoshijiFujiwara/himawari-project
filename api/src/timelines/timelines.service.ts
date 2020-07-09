import { Injectable, NotFoundException } from '@nestjs/common';
import { TimelineRepository } from './timeline.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TimelineEntity } from './timeline.entity';
import { UserEntity } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class TimelinesService {
  constructor(
    @InjectRepository(TimelineRepository)
    private timelineRepository: TimelineRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getByGroup(
    groupId: number,
    user: UserEntity,
  ): Promise<TimelineEntity[]> {
    const isBelongLoginUser = await this.userRepository.belongsToGroup(
      groupId,
      user,
    );
    if (!isBelongLoginUser) {
      throw new NotFoundException('このグループには参加していません');
    }

    return await this.timelineRepository.getByGroup(groupId);
  }
}
