import {
  Controller,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommitTimelineSerializer } from './serializer/commit-timeline.serializer';
import { CommitSerializer } from '../commits/serializer/commit.serializer';
import { GoalSerializer } from '../goals/serializer/goal.serializer';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { UserEntity } from 'src/auth/user.entity';

@ApiTags('timelines')
@Controller('groups/:id/timelines')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TimelinesController {
  @Get()
  @ApiOkResponse({
    description: 'timeline取得用ダミーAPI',
    type: [CommitTimelineSerializer],
  })
  async getTimelines(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<CommitTimelineSerializer[]> {
    // TODO 次のPRで消すこと
    // tslint:disable-next-line:no-console
    console.log(id);
    // tslint:disable-next-line:no-console
    console.log(user);

    const timelines = [];

    const goal1 = new GoalSerializer();
    goal1.id = 1;
    goal1.title = 'hogeGoal';
    goal1.description = 'hogehogeするぞ';
    goal1.isPublic = false;
    goal1.userId = 1;
    goal1.createdAt = new Date();

    const goal2 = new GoalSerializer();
    goal2.id = 2;
    goal2.title = 'fugaGoal';
    goal2.description = 'fugafugaするぞ';
    goal2.isPublic = false;
    goal2.userId = 2;
    goal2.createdAt = new Date();

    const commit1 = new CommitSerializer();
    commit1.id = 1;
    commit1.title = 'hogeCommit1';
    commit1.description = '';
    commit1.studyHours = 5;
    commit1.studyMinutes = 16;
    commit1.createdAt = new Date();
    commit1.goalId = 1;
    commit1.goal = goal1;

    const commit2 = new CommitSerializer();
    commit2.id = 2;
    commit2.title = 'fugaCommit1';
    commit2.description = '';
    commit2.studyHours = 5;
    commit2.studyMinutes = 16;
    commit2.createdAt = new Date();
    commit2.goalId = 2;
    commit2.goal = goal1;

    const commit3 = new CommitSerializer();
    commit3.id = 3;
    commit3.title = 'hogeCommit2';
    commit3.description = '';
    commit3.studyHours = 5;
    commit3.studyMinutes = 16;
    commit3.createdAt = new Date();
    commit3.goalId = 1;
    commit3.goal = goal1;

    const commit4 = new CommitSerializer();
    commit4.id = 4;
    commit4.title = 'hogeCommit3';
    commit4.description = '';
    commit4.studyHours = 5;
    commit4.studyMinutes = 16;
    commit4.createdAt = new Date();
    commit4.goalId = 1;
    commit4.goal = goal1;

    const timeline1 = new CommitTimelineSerializer();
    timeline1.id = 1;
    timeline1.commit = commit1;
    timelines.push(timeline1);

    const timeline2 = new CommitTimelineSerializer();
    timeline2.id = 1;
    timeline2.commit = commit2;
    timelines.push(timeline2);

    const timeline3 = new CommitTimelineSerializer();
    timeline3.id = 1;
    timeline3.commit = commit3;
    timelines.push(timeline3);

    const timeline4 = new CommitTimelineSerializer();
    timeline4.id = 1;
    timeline4.commit = commit4;
    timelines.push(timeline4);
    return timelines;
  }
}
