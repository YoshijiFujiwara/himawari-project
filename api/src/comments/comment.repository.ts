import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TimelineEntity } from '../timelines/timeline.entity';
import { UserEntity } from '../auth/user.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(
    { content }: CreateCommentDto,
    timeline: TimelineEntity,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const comment = new CommentEntity();
    comment.content = content;
    comment.timeline = timeline;
    comment.user = user;

    await comment.save();
    delete comment.timeline;

    return comment;
  }
}
