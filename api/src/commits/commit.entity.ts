import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GoalEntity } from '../goals/goal.entity';
import { CommitSerializer } from './serializer/commit.serializer';

@Entity({
  name: 'commits',
})
export class CommitEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column({
    name: 'study_time',
    type: 'time',
  })
  @ApiProperty()
  studyTime: string;

  @ManyToOne(
    type => GoalEntity,
    goal => goal.commits,
    { eager: false },
  )
  @JoinColumn({
    name: 'goal_id',
  })
  goal: GoalEntity;

  @Column({
    name: 'goal_id',
  })
  @ApiProperty()
  goalId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  updatedAt: Date;

  transformToSerializer = (): CommitSerializer => {
    const [hours, minutes] = this.studyTime
      .split(':')
      .map(time => parseInt(time, 10));
    const commitSerializer = new CommitSerializer();
    commitSerializer.id = this.id;
    commitSerializer.title = this.title;
    commitSerializer.description = this.description;
    commitSerializer.studyHours = hours;
    commitSerializer.studyMinutes = minutes;
    commitSerializer.goalId = this.goalId;
    commitSerializer.createdAt = this.createdAt;
    if (this.goal) {
      commitSerializer.goal = this.goal.transformToSerializer();
    }

    return commitSerializer;
  }
}
