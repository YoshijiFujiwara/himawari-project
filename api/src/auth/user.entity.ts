import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserSerializer } from './serializer/user.serializer';

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

  transformToSerializer = (): UserSerializer => {
    const userSerializer = new UserSerializer();
    userSerializer.id = this.id;
    userSerializer.username = this.username;
    userSerializer.email = this.email;

    return userSerializer;
  }
}
