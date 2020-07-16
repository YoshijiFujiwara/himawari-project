import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Put,
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
import { UpdateGoalDto } from './dto/update-goal.dto';

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
    type: [GoalSerializer],
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

  @Put(':id')
  @ApiOkResponse({
    description: '目標情報の更新',
    type: GoalSerializer,
  })
  async updateGoal(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateGoalDto: UpdateGoalDto,
    @GetUser() user: UserEntity,
  ): Promise<GoalSerializer> {
    const goalSerializer = new GoalSerializer();
    goalSerializer.id = 1;
    goalSerializer.title = updateGoalDto.title;
    goalSerializer.description = updateGoalDto.description;
    goalSerializer.isPublic = updateGoalDto.isPublic;
    goalSerializer.label = updateGoalDto.label;
    goalSerializer.createdAt = new Date();
    goalSerializer.totalTime = '10:00';
    goalSerializer.user = user;
    goalSerializer.userId = user.id;
    goalSerializer.commits = [];
    return goalSerializer;
  }
}
