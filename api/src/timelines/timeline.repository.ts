import { EntityRepository, Repository } from 'typeorm';
import { TimelineEntity } from './timeline.entity';
import { CommitEntity } from '../commits/commit.entity';
import { GroupEntity } from '../groups/group.entity';

@EntityRepository(TimelineEntity)
export class TimelineRepository extends Repository<TimelineEntity> {
  async shareCommitInTimeline(
    commit: CommitEntity,
    groups: GroupEntity[],
  ): Promise<void> {
    Promise.all(
      groups.map(async group => {
        const timeline = new TimelineEntity();
        timeline.commit = commit;
        timeline.group = group;
        return await timeline.save();
      }),
    );
  }

  async getByGroup(groupId: number): Promise<TimelineEntity[]> {
    return await this.createQueryBuilder('timeline')
      .leftJoinAndSelect('timeline.commit', 'commit')
      .leftJoinAndSelect('timeline.reactions', 'reactions')
      .leftJoinAndSelect('timeline.comments', 'comments')
      .leftJoinAndSelect('commit.goal', 'goal')
      .leftJoinAndSelect('goal.user', 'user')
      .where('timeline.group_id = :groupId', { groupId })
      .orderBy('timeline.id', 'DESC')
      .getMany();
  }
}
