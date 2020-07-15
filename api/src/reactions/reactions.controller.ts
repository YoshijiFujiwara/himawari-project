import {
  Controller,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReactionSerializer } from './serializer/reaction.serializer';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { GetUser } from 'src/auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
import { ReactionsService } from './reactions.service';

@ApiTags('reactions')
@Controller('timelines/:id/reactions')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReactionsController {
  constructor(private reactionService: ReactionsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'リアクションの投稿',
    type: ReactionSerializer,
  })
  @ApiNoContentResponse({
    description: '既に投稿しているリアクションを削除',
  })
  @ApiBadRequestResponse({
    description: '許可されていない絵文字を入力した場合',
  })
  @UsePipes(ValidationPipe)
  async createReaction(
    @Param('id', ParseIntPipe) timelineId: number,
    @Body() createReactionDto: CreateReactionDto,
    @GetUser() user: UserEntity,
  ): Promise<ReactionSerializer> {
    const reaction = await this.reactionService.toggleReaction(
      createReactionDto,
      timelineId,
      user,
    );
    return reaction.transformToSerializer();
  }
}
