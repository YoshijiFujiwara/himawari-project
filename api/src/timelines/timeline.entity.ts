import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CommitEntity } from '../commits/commit.entity';
import { GroupEntity } from '../groups/group.entity';
import { TimelineSerializer } from './serializer/timeline.serializer';
import { CommentEntity } from '../comments/comment.entity';

@Entity({
  name: 'timelines',
})
export class TimelineEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne('GroupEntity', 'timelines', { eager: false })
  @JoinColumn({ name: 'group_id' })
  @ApiProperty()
  group: GroupEntity;

  @Column({ name: 'group_id' })
  @ApiProperty()
  groupId: number;

  @ManyToOne(type => CommitEntity, { eager: false })
  @JoinColumn({
    name: 'commit_id',
  })
  @ApiProperty()
  commit: CommitEntity;

  @Column({ name: 'commit_id' })
  @ApiProperty()
  commitId: number;

  @OneToMany(
    type => CommentEntity,
    comment => comment.timeline,
    { eager: true },
  )
  @ApiProperty()
  comments: CommentEntity[];

  transformToSerializer = (): TimelineSerializer => {
    const timelineSerializer = new TimelineSerializer();
    timelineSerializer.id = this.id;
    timelineSerializer.commit = this.commit.transformToSerializer();

    return timelineSerializer;
  }
}
