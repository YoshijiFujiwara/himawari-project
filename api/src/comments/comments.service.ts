import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserEntity } from '../auth/user.entity';
import { GroupRepository } from '../groups/group.repository';
import { CommentEntity } from './comment.entity';
import { TimelineRepository } from '../timelines/timeline.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(TimelineRepository)
    private timelineRepository: TimelineRepository,
  ) {}

  async createComment(
    timelineId: number,
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const timeline = await this.timelineRepository.findOne({ id: timelineId });
    if (!timeline) {
      throw new NotFoundException('存在しないタイムラインです');
    }

    const group = await this.groupRepository.findOne({
      relations: ['users'],
      where: { id: timeline.groupId },
    });

    // timelineの投稿に紐付いているグループにログインユーザーが参加しているか
    if (!group.users.find(u => u.id === user.id)) {
      throw new NotFoundException();
    }

    return await this.commentRepository.createComment(
      createCommentDto,
      timeline,
      user,
    );
  }
}
