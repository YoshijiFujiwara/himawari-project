import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupSerializer } from './serializer/group.serializer';
import { GroupsService } from './groups.service';
import { InviteUserDto } from '../auth/dto/invite-group.dto';

@ApiTags('groups')
@Controller('groups')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'グループの作成',
    type: GroupSerializer,
  })
  async createGroup(
    @Body(ValidationPipe) createGroupDto: CreateGroupDto,
    @GetUser() user: UserEntity,
  ): Promise<GroupSerializer> {
    const groupEntity = await this.groupsService.createGroup(
      createGroupDto,
      user,
    );
    return groupEntity.transformToSerializer();
  }

  @Post(':id/users')
  @ApiCreatedResponse({
    description: 'グループへの招待',
  })
  async inviteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) InviteUserDto: InviteUserDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return await this.groupsService.inviteUser(id, InviteUserDto, user);
  }
}
