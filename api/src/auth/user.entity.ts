import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserSerializer } from './serializer/user.serializer';
import { TaskEntity } from '../tasks/task.entity';
import { GoalEntity } from '../goals/goal.entity';
import { GroupEntity } from '../groups/group.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({
    unique: true,
  })
  @ApiProperty()
  username: string;

  @Column({
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column({
    nullable: true, // SNS連携の際は不要であるため
  })
  @ApiProperty()
  password: string;

  @Column({
    name: 'avatar_url',
    nullable: true, // 初回登録時には不要であるため
  })
  @ApiProperty()
  avatarUrl: string;

  @Column({
    name: 'status_message',
    nullable: true, // 初回登録時には不要であるため
  })
  @ApiProperty()
  statusMessage: string;

  @Column({
    name: 'third_party_id',
    nullable: true, // 通常のサインアップでは不要
  })
  @ApiProperty()
  thirdPartyId: string;

  @Column({
    name: 'auth_provider',
    nullable: true, // 通常のサインアップでは不要
  })
  @ApiProperty()
  authProvider: string;

  @Column({
    name: 'is_email_verified',
    default: false,
  })
  @ApiProperty()
  isEmailVerified: boolean;

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

  @OneToMany(
    type => GoalEntity,
    goal => goal.user,
    { eager: true },
  )
  goals: GoalEntity[];

  @ManyToMany(
    type => GroupEntity,
    group => group.users,
  )
  // JoinTableは片方のテーブルにだけ書けば良い！
  @JoinTable({
    name: 'user_group',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: GroupEntity[];

  // TODO: 参考実装なので、あとで消し去ります！！
  @OneToMany(
    type => TaskEntity,
    task => task.user,
    { eager: true },
  )
  tasks: TaskEntity[];

  transformToSerializer = (): UserSerializer => {
    const userSerializer = new UserSerializer();
    userSerializer.id = this.id;
    userSerializer.username = this.username;
    userSerializer.email = this.email;
    if (this.avatarUrl) {
      userSerializer.avatarUrl = this.avatarUrl;
    }
    if (this.statusMessage) {
      userSerializer.statusMessage = this.statusMessage;
    }
    if (this.groups) {
      userSerializer.groups = this.groups.map(g => g.transformToSerializer());
    }

    return userSerializer;
  }
}
