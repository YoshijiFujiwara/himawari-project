import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GoalEntity } from '../goals/goal.entity';
import { TimelineReferenceType } from './timeline-reference-type.enum';
import { CommitEntity } from '../commits/commit.entity';
import { GroupEntity } from '../groups/group.entity';

@Entity({
  name: 'timelines',
})
export class TimelineEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(type => GroupEntity, { eager: false })
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;

  @Column({ name: 'group_id' })
  @ApiProperty()
  groupId: number;

  @ManyToOne(type => CommitEntity, { eager: false })
  commit: CommitEntity;

  @ManyToOne(type => GoalEntity, { eager: false })
  goal: GoalEntity;

  @Column({ name: 'reference_id' })
  @ApiProperty()
  referenceId: number;

  @Column({ name: 'reference_type' })
  @ApiProperty()
  referenceType: TimelineReferenceType;
}
