import { EntityRepository, Repository } from 'typeorm';
import { CommitEntity } from './commit.entity';

@EntityRepository(CommitEntity)
export class CommitRepository extends Repository<CommitEntity> {}
