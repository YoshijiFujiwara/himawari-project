import {
  Controller,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CommentSerializer } from './serializer/comment.serializer';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetUser } from '../auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
@ApiTags('comments')
@Controller()
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('timelines/:id/comments')
  @ApiCreatedResponse({
    description: 'コメントの投稿',
    type: CommentSerializer,
  })
  async createComment(
    @Param('id', ParseIntPipe) timelineId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @GetUser() user: UserEntity,
  ): Promise<CommentSerializer> {
    const commentSerializer = new CommentSerializer();
    commentSerializer.id = 1;
    commentSerializer.content = createCommentDto.content;
    commentSerializer.userId = user.id;
    commentSerializer.user = user.transformToSerializer();
    commentSerializer.timelineId = timelineId;
    commentSerializer.groupId = 1;
    commentSerializer.createdAt = new Date();

    return commentSerializer;
  }
}
