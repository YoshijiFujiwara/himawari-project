import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SearchesService } from './searches.service';
import { GroupSearchSerializer } from './serializer/group-search.serializer';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';

@ApiTags('searches')
@Controller('searches')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SearchesController {
  constructor(private searchesService: SearchesService) {}

  @Get('groups')
  @ApiOkResponse({
    description: 'グループ内での検索結果',
    type: GroupSearchSerializer,
  })
  async getGroupOf(
    @GetUser() user: UserEntity,
  ): Promise<GroupSearchSerializer> {
    const { users, goals } = await this.searchesService.getGroupOf(user);

    const groupSearch = new GroupSearchSerializer();
    groupSearch.users = users.map(u => u.transformToSerializer());
    groupSearch.goals = goals.map(g => g.transformToSerializer());

    return groupSearch;
  }

  @Get('users')
  @ApiOkResponse({
    description: '全体検索(ユーザー)',
  })
  async getUsers(@GetUser() user: UserEntity) {
    const users = await this.searchesService.getUsers(user);
    return users.map(u => u.transformToSerializer());
  }

  @Get('goals')
  @ApiOkResponse({
    description: '全体検索(目標)',
  })
  async getGoals(@GetUser() user: UserEntity) {
    const goals = await this.searchesService.getGoals(user);
    return goals.map(g => g.transformToSerializer());
  }
}
