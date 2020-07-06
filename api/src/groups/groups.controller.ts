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
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupSerializer } from './serializer/group.serializer';
import { GroupsService } from './groups.service';
import { InviteUserDto } from '../auth/dto/invite-group.dto';
import { TimelineSerializer } from './serializer/timeline.serializer';

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
    @Body(ValidationPipe) inviteUserDto: InviteUserDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return await this.groupsService.inviteUser(id, inviteUserDto, user);
  }

  @Get(':id/timeline')
  @ApiOkResponse({
    description: 'グループのタイムラインを取得',
    type: [TimelineSerializer],
  })
  @ApiNotFoundResponse({
    description: 'グループに参加していない為エラー',
  })
  async getTimeline(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<TimelineSerializer[]> {
    const commits = await this.groupsService.getTimeline(id, user);

    const commitsTimeline: TimelineSerializer[] = commits.map(commit => {
      return {
        type: 'commit',
        content: commit.transformToSerializer(),
      };
    });

    return commitsTimeline;
  }
}
