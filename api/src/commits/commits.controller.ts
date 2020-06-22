import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CommitsService } from './commits.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';
import { CommitSerializer } from './serializer/commit.serializer';

@ApiTags('commits')
@Controller()
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommitsController {
  constructor(private commitsService: CommitsService) {}

  @Post('goals/:goal_id/commits')
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

  @Get('commits')
  @ApiOkResponse({
    description: 'ログインユーザーの全学習履歴の取得',
  })
  async getCommits(@GetUser() user: UserEntity): Promise<CommitSerializer[]> {
    const commitEntity = await this.commitsService.getCommits(user);
    return commitEntity.map(g => g.transformToSerializer());
  }
}
