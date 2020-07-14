import { ReactionEntity } from './reaction.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(ReactionEntity)
export class ReactionRepository extends Repository<ReactionEntity> {}
