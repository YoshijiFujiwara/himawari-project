import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TimelineEntity } from '../timelines/timeline.entity';
import { ReactionType } from './reaction-type.enum';
import { UserEntity } from '../auth/user.entity';
import { ReactionSerializer } from './serializer/reaction.serializer';

@Entity({
  name: 'reactions',
})
export class ReactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(type => TimelineEntity, { eager: false })
  @JoinColumn({ name: 'timeline_id' })
  @ApiProperty()
  timeline: TimelineEntity;

  @Column({
    name: 'timeline_id',
  })
  @ApiProperty()
  timelineId: number;

  @Column({
    type:"enum",
    enum:ReactionType,
    default:ReactionType.GOOD
  })
  @ApiProperty()
  emoji: ReactionType;

  @ManyToOne(type => UserEntity, { eager: false })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty()
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

  transformToSerializer = (): ReactionSerializer => {
    const reactionSerializer = new ReactionSerializer();
    reactionSerializer.id = this.id;
    reactionSerializer.emoji = this.emoji;
    reactionSerializer.timelineId = this.timelineId;
    reactionSerializer.userId = this.userId;
    reactionSerializer.createdAt = this.createdAt;

    if (this.timeline) {
      reactionSerializer.timeline = this.timeline.transformToSerializer();
    }
    if (this.user) {
      reactionSerializer.user = this.user.transformToSerializer();
    }

    return reactionSerializer;
  }
}
