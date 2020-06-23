import { Test } from '@nestjs/testing';
import { GoalRepository } from './goal.repository';
import { CreateGoalDto } from './dto/create-goal.dto';

const createGoalDto: CreateGoalDto = {
  title: 'TOEIC900点',
  description: 'レッツ海外留学',
  isPublic: true,
};

describe('goalRepository', () => {
  let goalRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GoalRepository],
    }).compile();

    goalRepository = await module.get<GoalRepository>(GoalRepository);
  });

  describe('createGoal', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      goalRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('目標を追加する', () => {
      save.mockResolvedValue(undefined);
      expect(goalRepository.createGoal(createGoalDto));
    });
  });
});
