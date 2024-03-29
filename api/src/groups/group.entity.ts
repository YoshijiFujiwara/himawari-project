import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../auth/user.entity';
import { GroupSerializer } from './serializer/group.serializer';
import { GoalEntity } from '../goals/goal.entity';
import { TimelineEntity } from '../timelines/timeline.entity';

@Entity({
  name: 'groups',
})
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @ManyToMany(
    type => UserEntity,
    user => user.groups,
  )
  users: UserEntity[];

  @ManyToMany(
    type => GoalEntity,
    goal => goal.groups,
  )
  @ApiProperty()
  goals: GoalEntity[];

  @OneToMany('TimelineEntity', 'group', { eager: false })
  @ApiProperty()
  timelines: TimelineEntity[];

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

  @CreateDateColumn({
    name: 'last_timeline_posted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  lastTimelinePostedAt: Date;

  transformToSerializer = (): GroupSerializer => {
    const groupSerializer = new GroupSerializer();
    groupSerializer.id = this.id;
    groupSerializer.name = this.name;
    groupSerializer.createdAt = this.createdAt;
    groupSerializer.lastTimelinePostedAt = this.lastTimelinePostedAt;

    if (this.users) {
      groupSerializer.users = this.users.map(u => u.transformToSerializer());
    }
    if (this.goals) {
      groupSerializer.goals = this.goals.map(g => g.transformToSerializer());
    }

    return groupSerializer;
  };

  /**
   * タイムラインの最終投稿日時を更新
   */
  async updateLastTimelinePostedAt(
    timelineCreatedAt: Date,
  ): Promise<GroupEntity> {
    this.lastTimelinePostedAt = timelineCreatedAt;
    return await this.save();
  }
}
