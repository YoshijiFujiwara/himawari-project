import {
  Controller,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
import { TimelinesService } from './timelines.service';
import { TimelineSerializer } from './serializer/timeline.serializer';

@ApiTags('timelines')
@Controller('groups/:id/timelines')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TimelinesController {
  constructor(private timelineService: TimelinesService) {}

  @Get()
  @ApiOkResponse({
    description: 'timeline取得用ダミーAPI',
    type: [TimelineSerializer],
  })
  async getTimelines(
    @Param('id', ParseIntPipe) groupId: number,
    @GetUser() user: UserEntity,
  ): Promise<TimelineSerializer[]> {
    const timelines = await this.timelineService.getTimelines(groupId, user);
    return timelines.map(t => t.transformToSerializer());
  }
}
