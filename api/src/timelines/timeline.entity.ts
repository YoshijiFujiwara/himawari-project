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
import { ReactionEntity } from '../reactions/reaction.entity';
import { CommentEntity } from '../comments/comment.entity';
import { TimelineTypeEnum } from './timeline-type.enum';
import { GoalEntity } from '../goals/goal.entity';

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

  // タイムラインに流れる情報のタイムを列挙型で格納します
  @Column({
    type: 'enum',
    enum: TimelineTypeEnum,
    default: TimelineTypeEnum.COMMIT_CREATED,
  })
  @ApiProperty({
    type: TimelineTypeEnum,
  })
  type: TimelineTypeEnum;

  @ManyToOne(type => CommitEntity, { eager: false })
  @JoinColumn({
    name: 'commit_id',
  })
  @ApiProperty()
  commit: CommitEntity;

  @Column({
    name: 'commit_id',
    nullable: true, // typeカラムがTimelineTypeEnum.COMMIT_CREATEDのときに値が入る
  })
  @ApiProperty()
  commitId: number;

  @ManyToOne(type => GoalEntity, { eager: false })
  @JoinColumn({
    name: 'goal_id',
  })
  @ApiProperty()
  goal: GoalEntity;

  @Column({
    name: 'goal_id',
    nullable: true, // typeカラムがTimelineTypeEnum.GOAL_UPDATEDのときに値が入る
  })
  @ApiProperty()
  goalId: number;

  @OneToMany(
    type => ReactionEntity,
    reaction => reaction.timeline,
    { eager: true },
  )
  @ApiProperty()
  reactions: ReactionEntity[];

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

    if (this.reactions) {
      timelineSerializer.reactions = this.reactions.map(r =>
        r.transformToSerializer(),
      );
    }
    if (this.comments) {
      timelineSerializer.comments = this.comments.map(c =>
        c.transformToSerializer(),
      );
    }

    return timelineSerializer;
  };
}
