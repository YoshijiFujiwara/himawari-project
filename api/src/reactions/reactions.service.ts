import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionRepository } from './reaction.repository';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UserEntity } from '../auth/user.entity';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';
import { ReactionEntity } from './reaction.entity';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(ReactionRepository)
    private reactionRepository: ReactionRepository,
    @InjectRepository(TimelineRepository)
    private timelineRepository: TimelineRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async createReaction(
    createReactionDto: CreateReactionDto,
    timelineId: number,
    user: UserEntity,
  ): Promise<ReactionEntity> {
    const timeline = await this.timelineRepository.findOne({ id: timelineId });
    if (!timeline) {
      throw new NotFoundException('存在しない投稿です');
    }

    const group = await this.groupRepository.findOne({
      relations: ['users'],
      where: { id: timeline.groupId },
    });

    // timelineの投稿に紐付いているグループにログインユーザーが参加しているか
    if (!group.users.find(u => u.id === user.id)) {
      throw new NotFoundException();
    }

    return await this.reactionRepository.createReaction(
      createReactionDto,
      timeline,
      user,
    );
  }
}
