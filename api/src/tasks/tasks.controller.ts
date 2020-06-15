import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TaskSerializer } from './task.serializer';
import { GetUser } from '../auth/get-user-decorator';
import { UserEntity } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'タスクの一覧を取得できた',
    type: [TaskSerializer], // https://docs.nestjs.com/recipes/swagger#arrays
  })
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskSerializer[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'タスクを1件取得できた',
    type: TaskSerializer,
  })
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<TaskSerializer> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'タスクが正常に作成されました',
    type: TaskSerializer,
  })
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskSerializer> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'タスクが削除された',
  })
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  @ApiResponse({
    status: 200,
    description: 'タスクのステータスが更新できた',
    type: TaskSerializer,
  })
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: UserEntity,
  ): Promise<TaskSerializer> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
