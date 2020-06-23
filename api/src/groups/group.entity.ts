import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(
    type => UserEntity,
    user => user.groups,
    { eager: false },
  )
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @Column({ name: 'owner_id' })
  @ApiProperty()
  ownerId: number;

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
    groupSerializer.ownerId = this.ownerId;
    groupSerializer.createdAt = this.createdAt;
    if (this.owner) {
      groupSerializer.owner = this.owner.transformToSerializer();
    }

    return groupSerializer;
  }
}
