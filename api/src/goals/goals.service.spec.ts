import { Test } from '@nestjs/testing';
import { GoalsService } from './goals.service';
import { GoalRepository } from './goal.repository';
import { GoalEntity } from './goal.entity';
import { UserEntity } from '../auth/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { NotFoundException } from '@nestjs/common';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';
import { CommitRepository } from '../commits/commit.repository';

const mockGoalRepository = () => ({
  createGoal: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});
const mockCommitRepository = () => ({});

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

export const buildGoal = ({
  id,
  title,
  description,
  isPublic,
  user,
}): GoalEntity => {
  const goal = new GoalEntity();
  goal.id = id;
  goal.title = title;
  goal.description = description;
  goal.isPublic = isPublic;
  goal.user = user;
  goal.userId = user.id;
  goal.commits = [];
  goal.createdAt = new Date();
  goal.updatedAt = new Date();
  return goal;
};

describe('GoalsService', () => {
  let goalsService;
  let goalRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GoalsService,
        { provide: GoalRepository, useFactory: mockGoalRepository },
        { provide: CommitRepository, useFactory: mockCommitRepository },
        { provide: TimelineRepository, useFactory: mockGoalRepository },
        { provide: GroupRepository, useFactory: mockGoalRepository },
      ],
    }).compile();

    goalsService = await module.get<GoalsService>(GoalsService);
    goalRepository = await module.get<GoalRepository>(GoalRepository);
  });

  describe('createGoal', () => {
    it('goalRepository()が呼ばれ、結果を返却する', async () => {
      const goal = buildGoal({
        id: 1,
        title: 'TOEIC900点',
        description: 'レッツ海外留学',
        isPublic: true,
        user: mockUser,
      });
      goalRepository.createGoal.mockResolvedValue(goal);

      const createGoalDto: CreateGoalDto = {
        title: 'TOEIC900点',
        description: 'レッツ海外留学',
        isPublic: true,
      };
      const result = await goalsService.createGoal(createGoalDto, mockUser);
      expect(goalRepository.createGoal).toHaveBeenCalledWith(
        createGoalDto,
        mockUser,
      );
      expect(result).toEqual(goal);
    });
  });

  describe('getGoals', () => {
    it('goalRepository.findを呼び、結果を返す', async () => {
      const goals = [
        buildGoal({
          id: 1,
          title: 'TOEIC900点',
          description: 'レッツ海外留学',
          isPublic: true,
          user: mockUser,
        }),
        buildGoal({
          id: 2,
          title: 'TOEIC900点',
          description: 'レッツ海外留学',
          isPublic: true,
          user: mockUser,
        }),
      ];
      goalRepository.find.mockResolvedValue(goals);

      const result = await goalsService.getGoals(mockUser);
      expect(result.length).toEqual(2);
      expect(result).toStrictEqual(goals);
    });
  });

  describe('getGoal', () => {
    it('goalRepository.findOne()を呼び、結果を返す', async () => {
      const goal = buildGoal({
        id: 1,
        title: 'TOEIC900点',
        description: 'レッツ海外留学',
        isPublic: true,
        user: mockUser,
      });
      goalRepository.findOne.mockResolvedValue(goal);

      const result = await goalsService.getGoal(1, mockUser);
      expect(result).toStrictEqual(goal);
    });

    it('goalが見つからなかった場合、NotFoundExceptionを投げる', () => {
      goalRepository.findOne.mockResolvedValue(null);

      expect(goalsService.getGoal(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
