import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GoalsService } from './goals.service';
import { GetUser } from '../auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';

@ApiTags('goals')
@Controller('goals')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: '目標の作成',
  })
  createGoals(
    @Body() createGoalDto: CreateGoalDto,
    @GetUser() user: UserEntity,
  ) {
    return this.goalsService.createGoal(createGoalDto, user);
  }
}
