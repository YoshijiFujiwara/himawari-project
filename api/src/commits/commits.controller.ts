import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CommitsService } from './commits.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { CommitSerializer } from './serializer/commit.serializer';

@ApiTags('commits')
@Controller('goals/:goal_id/commits')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommitsController {
  constructor(private commitsService: CommitsService) {}

  @Post()
  @ApiCreatedResponse({
    description: '学習記録の作成',
    type: CommitSerializer,
  })
  async createCommit(
    @Body(ValidationPipe) createCommitDto: CreateCommitDto,
    @Param('goal_id', ParseIntPipe) goalId: number,
    @GetUser() user: UserEntity,
  ): Promise<CommitSerializer> {
    const commitEntity = await this.commitsService.createCommit(
      createCommitDto,
      goalId,
      user,
    );
    return commitEntity.transformToSerializer();
  }
}
