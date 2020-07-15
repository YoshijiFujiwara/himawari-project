import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
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

  async toggleReaction(
    createReactionDto: CreateReactionDto,
    timelineId: number,
    user: UserEntity,
  ): Promise<ReactionEntity> {
    const timeline = await this.timelineRepository.findOne({
      relations: ['commit', 'commit.goal'],
      where: { id: timelineId },
    });
    if (!timeline) {
      throw new NotFoundException('存在しない投稿です');
    }
    if (timeline.commit.goal.userId === user.id) {
      throw new ForbiddenException();
    }

    const group = await this.groupRepository.findOne({
      relations: ['users'],
      where: { id: timeline.groupId },
    });
    // timelineの投稿に紐付いているグループにログインユーザーが参加しているか
    if (!group.users.find(u => u.id === user.id)) {
      throw new NotFoundException();
    }

    // ログインユーザーが、timelineの投稿にすでに同じリアクションを送っている -> 削除
    const existingReaction = await this.reactionRepository.findOne({
      timelineId,
      userId: user.id,
      emoji: createReactionDto.emoji,
    });
    if (existingReaction) {
      await this.reactionRepository.delete({ id: existingReaction.id });
      throw new HttpException({ status: HttpStatus.NO_CONTENT }, 204);
    }

    return await this.reactionRepository.createReaction(
      createReactionDto,
      timeline,
      user,
    );
  }
}
