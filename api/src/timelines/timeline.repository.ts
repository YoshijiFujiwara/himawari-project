import { EntityRepository, Repository } from 'typeorm';
import { TimelineEntity } from './timeline.entity';
import { TimelineReferenceType } from './timeline-reference-type.enum';
import { GoalEntity } from '../goals/goal.entity';

@EntityRepository(TimelineEntity)
export class TimelineRepository extends Repository<TimelineEntity> {
  async post(
    goal: GoalEntity,
    referenceId: number,
    referenceType: TimelineReferenceType,
  ): Promise<TimelineEntity> {
    const timeline = new TimelineEntity();
    timeline.goal = goal;
    timeline.referenceId = referenceId;
    timeline.referenceType = referenceType;
    await timeline.save();

    return timeline;
  }
}
