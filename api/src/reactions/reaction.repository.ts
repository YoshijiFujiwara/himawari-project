import { ReactionEntity } from './reaction.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { TimelineEntity } from '../timelines/timeline.entity';
import { UserEntity } from '../auth/user.entity';

@EntityRepository(ReactionEntity)
export class ReactionRepository extends Repository<ReactionEntity> {
  async createReaction(
    { emoji }: CreateReactionDto,
    timeline: TimelineEntity,
    user: UserEntity,
  ): Promise<ReactionEntity> {
    const reaction = new ReactionEntity();
    reaction.emoji = emoji;
    reaction.timeline = timeline;
    reaction.user = user;
    await reaction.save();
    delete reaction.user;

    return reaction;
  }
}
