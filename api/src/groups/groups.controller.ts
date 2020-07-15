import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupSerializer } from './serializer/group.serializer';
import { GroupsService } from './groups.service';
import { InviteUserDto } from '../auth/dto/invite-group.dto';
import { AssignGoalDto } from './dto/assign-goal.dto';

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
}
