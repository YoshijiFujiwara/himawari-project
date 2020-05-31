import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
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
}
