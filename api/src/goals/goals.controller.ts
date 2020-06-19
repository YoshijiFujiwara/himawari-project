import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GoalsService } from './goals.service';
import { GetUser } from '../auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalSerializer } from './serializer/goal.serializer';

@ApiTags('goals')
@Controller('goals')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @ApiCreatedResponse({
    description: '目標の作成',
    type: GoalSerializer,
  })
  async createGoal(
    @Body(ValidationPipe) createGoalDto: CreateGoalDto,
    @GetUser() user: UserEntity,
  ): Promise<GoalSerializer> {
    const goalEntity = await this.goalsService.createGoal(createGoalDto, user);
    return goalEntity.transformToSerializer();
  }

  @Get()
  @ApiOkResponse({
    description: '目標の一覧取得',
  })
  async getGoals(@GetUser() user: UserEntity): Promise<GoalSerializer[]> {
    const goalEntities = await this.goalsService.getGoals(user);
    return goalEntities.map(g => g.transformToSerializer());
  }

  @Get(':id')
  @ApiOkResponse({
    description: '目標の詳細取得',
    type: GoalSerializer,
  })
  async getGoal(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<GoalSerializer> {
    const goalEntity = await this.goalsService.getGoal(id, user);
    return goalEntity.transformToSerializer();
  }
}
