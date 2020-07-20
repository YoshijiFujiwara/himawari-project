import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SearchesService } from './searches.service';
import { SearchSerializer } from './serializer/search.serializer';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';

@ApiTags('searches')
@Controller('searches')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SearchesController {
  constructor(private searchesService: SearchesService) {}

  @Get('in_related_users')
  @ApiOkResponse({
    description: '自分の参加しているグループのメンバーの中での検索結果',
    type: SearchSerializer,
  })
  async searchInGroupRelatedUsers(
    @GetUser() user: UserEntity,
  ): Promise<SearchSerializer> {
    const {
      users,
      goals,
    } = await this.searchesService.searchInGroupRelatedUsers(user);

    const groupSearch = new SearchSerializer();
    groupSearch.users = users.map(u => u.transformToSerializer());
    groupSearch.goals = goals.map(g => g.transformToSerializer());

    return groupSearch;
  }
}
