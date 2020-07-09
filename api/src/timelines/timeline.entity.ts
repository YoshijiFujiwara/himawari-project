import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CommitEntity } from '../commits/commit.entity';
import { GroupEntity } from '../groups/group.entity';
import { TimelineSerializer } from './serializer/timeline.serializer';

@Entity({
  name: 'timelines',
})
export class TimelineEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(type => GroupEntity, { eager: false })
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

  transformToSerializer = (): TimelineSerializer => {
    const timelineSerializer = new TimelineSerializer();
    timelineSerializer.id = this.id;
    timelineSerializer.commit = this.commit.transformToSerializer();

    return timelineSerializer;
  };
}
