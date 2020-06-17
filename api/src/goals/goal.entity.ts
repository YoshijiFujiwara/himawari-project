import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../auth/user.entity';
import { GoalSerializer } from './serializer/goal.serializer';
import { CommitEntity } from '../commits/commit.entity';

@Entity({
  name: 'goals',
})
export class GoalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  description: string;

  @Column({
    name: 'is_public',
    default: false,
  })
  @ApiProperty()
  isPublic: boolean;

  @ManyToOne(
    type => UserEntity,
    user => user.goals,
    { eager: false },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;

  @OneToMany(
    type => CommitEntity,
    commit => commit.goal,
    { eager: true },
  )
  commits: CommitEntity[];

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

  transformToSerializer = (): GoalSerializer => {
    const goalSerializer = new GoalSerializer();
    goalSerializer.id = this.id;
    goalSerializer.title = this.title;
    goalSerializer.description = this.description;
    goalSerializer.isPublic = this.isPublic;
    goalSerializer.userId = this.userId;
    goalSerializer.createdAt = this.createdAt;
    if (this.user) {
      goalSerializer.user = this.user.transformToSerializer();
    }
    if (this.commits) {
      for (const commit of this.commits) {
        goalSerializer.commits.push(commit.transformToSerializer());
      }
    }

    return goalSerializer;
  };
}
