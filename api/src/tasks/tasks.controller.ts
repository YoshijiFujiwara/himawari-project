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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { TaskSerializer } from './task.serializer';

@ApiTags('tasks')
@Controller('tasks')
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
  ): Promise<TaskSerializer[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'タスクを1件取得できた',
    type: TaskSerializer,
  })
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskSerializer> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'タスクが正常に作成されました',
    type: TaskSerializer,
  })
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskSerializer> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'タスクが削除された',
  })
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
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
  ): Promise<TaskSerializer> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
