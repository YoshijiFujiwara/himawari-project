import { EntityRepository, Repository } from 'typeorm';
import { TimelineEntity } from './timeline.entity';
import { CommitEntity } from '../commits/commit.entity';
import { GroupEntity } from '../groups/group.entity';
import { TimelineTypeEnum } from './timeline-type.enum';
import { GoalEntity } from '../goals/goal.entity';
import { GoalLabelEnum } from '../goals/goal-label.enum';

@EntityRepository(TimelineEntity)
export class TimelineRepository extends Repository<TimelineEntity> {
  async shareCommitInTimeline(
    commit: CommitEntity,
    groups: GroupEntity[],
  ): Promise<void> {
    Promise.all(
      groups.map(async group => {
        const timeline = new TimelineEntity();
        timeline.type = TimelineTypeEnum.COMMIT_CREATED;
        timeline.commit = commit;
        timeline.group = group;
        return await timeline.save();
      }),
    );
  }

  async shareGoalInTimeline(
    goal: GoalEntity,
    groups: GroupEntity[],
    fromLabel: GoalLabelEnum,
    toLabel: GoalLabelEnum,
  ): Promise<void> {
    Promise.all(
      groups.map(async group => {
        const timeline = new TimelineEntity();
        timeline.type = TimelineTypeEnum.GOAL_STATUS_UPDATED;
        timeline.goal = goal;
        timeline.fromLabel = fromLabel;
        timeline.toLabel = toLabel;
        timeline.group = group;
        return await timeline.save();
      }),
    );
  }

  async getByGroup(groupId: number): Promise<TimelineEntity[]> {
    return await this.createQueryBuilder('timeline')
      .leftJoinAndSelect('timeline.commit', 'commit')
      .leftJoinAndSelect('timeline.goal', 'timeline_goal')
      .leftJoinAndSelect('timeline.reactions', 'reactions')
      .leftJoinAndSelect('timeline.comments', 'comments')
      .leftJoinAndSelect('commit.goal', 'goal')
      .leftJoinAndSelect('goal.user', 'commit_goal_user')
      .leftJoinAndSelect('timeline_goal.user', 'goal_user')
      .leftJoinAndSelect('timeline_goal.commits', 'goal_commits')
      .where('timeline.group_id = :groupId', { groupId })
      .orderBy('timeline.id', 'DESC')
      .getMany();
  }
}
