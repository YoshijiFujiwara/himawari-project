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

@Entity({
  name: 'timelines',
})
export class TimelineEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(type => GoalEntity, { eager: false })
  @JoinColumn({ name: 'goal_id' })
  goal: GoalEntity;

  @Column({ name: 'goal_id' })
  @ApiProperty()
  goalId: number;

  @Column({ name: 'reference_id' })
  @ApiProperty()
  referenceId: number;

  @Column({ name: 'reference_type' })
  @ApiProperty()
  referenceType: TimelineReferenceType;
}
