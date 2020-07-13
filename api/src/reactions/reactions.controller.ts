import {
  Controller,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReactionSerializer } from './serializer/reaction.serializer';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { GetUser } from 'src/auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
import { ReactionType } from './reaction-type.enum';

@ApiTags('timelines')
@Controller('timelines/:id/reactions')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReactionsController {
  @Post()
  @ApiCreatedResponse({
    description: 'リアクションの投稿',
    type: ReactionSerializer,
  })
  async createReaction(
    @Param('id', ParseIntPipe) timelineId: number,
    @Body() createReactionDto: CreateReactionDto,
    @GetUser() user: UserEntity,
  ): Promise<ReactionSerializer> {
    const reactionSerializer = new ReactionSerializer();
    reactionSerializer.id = 1;
    reactionSerializer.emoji = createReactionDto.emoji;
    reactionSerializer.timelineId = timelineId;
    reactionSerializer.userId = user.id;
    reactionSerializer.user = user;

    return reactionSerializer;
  }
}
