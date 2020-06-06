import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('taskRepositoryでタスク一覧を取得できる', async () => {
      taskRepository.getTasks.mockResolvedValue('ほげほげ');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      const result = await tasksService.getTasks(filters);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('ほげほげ');
    });
  });

  describe('getTaskById', () => {
    it('taskRepository.findOne()を呼び、正常にタスクを返される', async () => {
      const mockTask = { title: 'Test task', description: 'Test desc' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('タスクが見つからない場合は、エラーが返却される', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('taskRepository.create()が呼ばれ、結果が返却', async () => {
      taskRepository.createTask.mockResolvedValue('とあるタスク');

      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const createTaskDto = { title: 'Test task', description: 'Test desc' };
      const result = await tasksService.createTask(createTaskDto);
      expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual('とあるタスク');
    });
  });

  describe('deleteTask', () => {
    it('taskRepository.deleteTask()がよばれ、タスクが削除される', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      await tasksService.deleteTask(1);
      expect(taskRepository.delete).toHaveBeenCalledWith(1);
    });

    it('タスクが見つからない場合は、エラーが返却される', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTaskStatus', () => {
    it('タスクのステータスを更新する', async () => {
      const save = jest.fn().mockResolvedValue(true);

      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });

      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
      const result = await tasksService.updateTaskStatus(1, TaskStatus.DONE);
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});
