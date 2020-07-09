import { EntityRepository, Repository } from 'typeorm';
import { TimelineEntity } from './timeline.entity';
import { CommitEntity } from '../commits/commit.entity';
import { GroupEntity } from '../groups/group.entity';

@EntityRepository(TimelineEntity)
export class TimelineRepository extends Repository<TimelineEntity> {
  async syncCommit(commit: CommitEntity, groups: GroupEntity[]): Promise<void> {
    // ここのinsert処理、並列実行させたくね？書き方わからんけど
    groups.forEach(async group => {
      const timeline = new TimelineEntity();
      timeline.commit = commit;
      timeline.group = group;
      await timeline.save();
    });
  }

  async getByGroup(groupId: number): Promise<TimelineEntity[]> {
    return await this.createQueryBuilder('timeline')
      .leftJoinAndSelect('timeline.commit', 'commit')
      .leftJoinAndSelect('commit.goal', 'goal')
      .leftJoinAndSelect('goal.user', 'user')
      .where('timeline.group_id = :groupId', { groupId })
      .orderBy('timeline.id', 'DESC')
      .getMany();
  }
}
