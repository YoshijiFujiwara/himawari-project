import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TimelineEntity } from '../timelines/timeline.entity';
import { UserEntity } from '../auth/user.entity';

@Entity({
  name: 'comments',
})
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column('text')
  @ApiProperty()
  content: string;

  @ManyToOne(type => TimelineEntity, { eager: false })
  @JoinColumn({ name: 'timeline_id' })
  @ApiProperty()
  timeline: TimelineEntity;

  @Column({ name: 'timeline_id' })
  @ApiProperty()
  timelineId: number;

  @ManyToOne(type => UserEntity, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;

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
}
