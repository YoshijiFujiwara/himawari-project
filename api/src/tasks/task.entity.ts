import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/auth/user.entity';

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
  user: UserEntity;

  @Column()
  userId: number;
}
