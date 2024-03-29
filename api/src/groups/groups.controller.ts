import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupSerializer } from './serializer/group.serializer';
import { GroupsService } from './groups.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { AssignGoalDto } from './dto/assign-goal.dto';
import { InviteUsersDto } from './dto/invite-users.dto';
import { BulkAssignGoalsDto } from './dto/bulk-assign-goals.dto';

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
  @ApiBadRequestResponse({
    description: '存在しないメールアドレスが含まれていた場合',
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

  @Get()
  @ApiOkResponse({
    description: '参加しているグループ一覧を取得',
    type: [GroupSerializer],
  })
  async getGroups(@GetUser() user: UserEntity): Promise<GroupSerializer[]> {
    const groups = await this.groupsService.getGroups(user);
    return groups.map(g => g.transformToSerializer());
  }

  @Post(':id/users')
  @ApiCreatedResponse({
    description: 'グループへの招待',
  })
  async inviteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) inviteUserDto: InviteUserDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return await this.groupsService.inviteUser(id, inviteUserDto, user);
  }

  @Post(':id/users/multiple')
  @ApiCreatedResponse({
    description: 'グループへの複数のメールアドレスでの招待',
  })
  @ApiBadRequestResponse({
    description: '存在しないメールアドレスが含まれていた場合',
  })
  async inviteUsers(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) inviteUsersDto: InviteUsersDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    await this.groupsService.inviteUsers(id, inviteUsersDto, user);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'グループの基本情報を取得',
    type: GroupSerializer,
  })
  @ApiNotFoundResponse({
    description: '参加していない or 存在していないグループを指定した時404',
  })
  async getGroup(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<GroupSerializer> {
    const groupEntity = await this.groupsService.getGroup(id, user);
    return groupEntity.transformToSerializer();
  }

  @Post(':id/goals')
  @ApiCreatedResponse({
    description: 'グループへの目標登録',
  })
  @ApiConflictResponse({
    description: '目標をグループに登録する際に、登録済だった場合',
  })
  async assignGoal(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) assignGoalDto: AssignGoalDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return await this.groupsService.assignGoal(id, assignGoalDto, user);
  }

  @Put(':id/goals/bulk')
  @ApiOkResponse({
    description:
      'グループへの目標の一括登録。ここに含まれていない目標IDに関しては、すでに登録済だった場合、自動で削除する',
    type: GroupSerializer,
  })
  @ApiBadRequestResponse({
    description: '他人の目標のIDを操作しようとした時',
  })
  async bulkAssignGoals(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) bulkAssignGoalsDto: BulkAssignGoalsDto,
    @GetUser() user: UserEntity,
  ): Promise<GroupSerializer> {
    const group = await this.groupsService.bulkAssignGoals(
      id,
      bulkAssignGoalsDto,
      user,
    );
    return group.transformToSerializer();
  }
}
