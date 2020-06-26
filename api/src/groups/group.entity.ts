import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../auth/user.entity';
import { GroupSerializer } from './serializer/group.serializer';

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

  transformToSerializer = (): GroupSerializer => {
    const groupSerializer = new GroupSerializer();
    groupSerializer.id = this.id;
    groupSerializer.name = this.name;
    groupSerializer.createdAt = this.createdAt;
    if (this.users) {
      groupSerializer.users = this.users.map(u => u.transformToSerializer());
    }

    return groupSerializer;
  }
}
