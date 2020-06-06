import { TaskStatus } from './task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TaskSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: TaskStatus;
}
