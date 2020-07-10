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

  async getTimelines(
    groupId: number,
    user: UserEntity,
  ): Promise<TimelineEntity[]> {
    const isBelongsTo = await this.userRepository.belongsToGroup(groupId, user);
    if (!isBelongsTo) {
      throw new NotFoundException('このグループには参加していません');
    }

    return await this.timelineRepository.getByGroup(groupId);
  }
}
