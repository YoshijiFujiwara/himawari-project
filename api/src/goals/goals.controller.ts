import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// import { GoalsService } from './goals.service';
import { GetUser } from '../auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalSerializer } from './serializer/goal.serializer';

@ApiTags('goals')
@Controller('goals')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class GoalsController {
  // constructor(private goalsService: GoalsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: '目標の作成',
  })
  createGoals(
    @Body() createGoalDto: CreateGoalDto,
    @GetUser() user: UserEntity,
  ): GoalSerializer {
    const { title, description, isPublic } = createGoalDto;
    const goal = new GoalSerializer();
    const date = new Date();
    goal.id = 1;
    goal.title = title;
    goal.description = description;
    goal.isPublic = isPublic;
    goal.userId = user.id;
    goal.createdAt = date;

    return goal;
  }
}
