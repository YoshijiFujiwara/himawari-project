import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserEntity } from '../auth/user.entity';

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

const buildTask = ({
  id,
  title,
  description,
  status,
}: Pick<TaskEntity, 'id' | 'title' | 'description' | 'status'>): TaskEntity => {
  const task = new TaskEntity();
  task.id = id;
  task.title = title;
  task.description = description;
  task.status = status;
  return task;
};

describe('tasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;
  beforeEach(() => {
    // tslint:disable-next-line:prefer-const
    let taskRepository: TaskRepository;
    tasksService = new TasksService(taskRepository);
    tasksController = new TasksController(tasksService);
  });

  describe('findAll', () => {
    it('タスクの一覧を返却する', async () => {
      const result = [
        buildTask({
          id: 1,
          title: 'specialtitle',
          description: 'fuga',
          status: TaskStatus.OPEN,
        }),
        buildTask({
          id: 2,
          title: 'hoge',
          description: 'hogehoge',
          status: TaskStatus.IN_PROGRESS,
        }),
      ];
      jest
        .spyOn(tasksService, 'getTasks')
        .mockImplementation(() => Promise.resolve(result));

      const filterDto: GetTasksFilterDto = { status: null, search: null };
      expect(await tasksController.getTasks(filterDto, mockUser)).toBe(result);
    });
  });

  describe('getTaskById', () => {
    it('idで指定したタスクを1件返す', async () => {
      const result = buildTask({
        id: 1,
        title: 'specialtitle',
        description: 'fuga',
        status: TaskStatus.OPEN,
      });
      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tasksController.getTaskById(1, mockUser)).toBe(result);
    });
  });

  describe('createTask', () => {
    it('タスクを1件作成する', async () => {
      const result = buildTask({
        id: 1,
        title: 'specialtitle',
        description: 'fuga',
        status: TaskStatus.OPEN,
      });
      jest
        .spyOn(tasksService, 'createTask')
        .mockImplementation(() => Promise.resolve(result));

      const createTaskDto: CreateTaskDto = {
        title: 'fuga',
        description: 'hoge',
      };
      expect(await tasksController.createTask(createTaskDto, mockUser)).toBe(
        result,
      );
    });
  });

  describe('deleteTask', () => {
    it('タスクを1件削除する', async () => {
      jest
        .spyOn(tasksService, 'deleteTask')
        .mockImplementation(() => Promise.resolve());

      expect(await tasksController.deleteTask(1, mockUser)).toBe(undefined);
    });
  });

  describe('updateTask', () => {
    it('タスクのステータスを更新する', async () => {
      const result = buildTask({
        id: 1,
        title: 'specialtitle',
        description: 'fuga',
        status: TaskStatus.OPEN,
      });
      jest
        .spyOn(tasksService, 'updateTaskStatus')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await tasksController.updateTaskStatus(1, TaskStatus.OPEN, mockUser),
      ).toBe(result);
    });
  });
});
