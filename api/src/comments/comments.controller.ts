import {
  Controller,
  UseGuards,
  Post,
  ValidationPipe,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentSerializer } from './serializer/comment.serializer';
import { GetUser } from '../auth/get-user-decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
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
    const comment = await this.commentsService.createComment(
      timelineId,
      createCommentDto,
      user,
    );

    return comment.transformToSerializer();
  }
}
