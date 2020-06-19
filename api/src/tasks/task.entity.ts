import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../auth/user.entity';

@Entity({
  name: 'tasks',
})
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  status: TaskStatus;

  @ManyToOne(
    type => UserEntity,
    user => user.tasks,
    { eager: false },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;
}
