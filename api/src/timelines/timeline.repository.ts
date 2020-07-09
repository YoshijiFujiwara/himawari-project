import { EntityRepository, Repository } from 'typeorm';
import { TimelineEntity } from './timeline.entity';
import { CommitEntity } from '../commits/commit.entity';

@EntityRepository(TimelineEntity)
export class TimelineRepository extends Repository<TimelineEntity> {
  async sync(commit: CommitEntity): Promise<TimelineEntity> {
    const timeline = new TimelineEntity();
    timeline.commit = commit;

    await timeline.save();
    return timeline;
  }

  async getByGroup(groupId: number) {
    return await this.createQueryBuilder('timeline')
      .leftJoinAndSelect('timeline.commit', 'commit')
      .leftJoinAndSelect('commit.goal', 'goal')
      .leftJoinAndSelect('goal.user', 'user')
      .where('timeline.group_id = :groupId', { groupId })
      .getMany();
  }
}
