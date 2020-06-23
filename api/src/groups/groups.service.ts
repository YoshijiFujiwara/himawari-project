import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserEntity } from '../auth/user.entity';
import { GroupEntity } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async createGroup(
    createGroupDto: CreateGroupDto,
    user: UserEntity,
  ): Promise<GroupEntity> {
    return await this.groupRepository.createGroup(createGroupDto, user);
  }
}
