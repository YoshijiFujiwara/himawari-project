import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CommitsService } from './commits.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';

@ApiTags('commits')
@Controller('goals/:goal_id/commits')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommitsController {
  constructor(private commitsService: CommitsService) {}

  @Post()
  @ApiCreatedResponse({
    description: '学習記録の作成',
  })
  async createCommit(
    @Body() createCommitDto: CreateCommitDto,
    @Param('goal_id', ParseIntPipe) goal_id: number,
    @GetUser() user: UserEntity,
  ) {
    return {
      ...createCommitDto,
      goal_id,
      user,
    };
  }
}
