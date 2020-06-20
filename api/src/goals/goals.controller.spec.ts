import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalRepository } from './goal.repository';

describe('goalsController', () => {
  let goalsController: GoalsController;
  let goalsService: GoalsService;

  beforeEach(() => {
    // tslint:disable-next-line:prefer-const
    let goalRepository: GoalRepository;
    goalsService = new GoalsService(goalRepository);
    goalsController = new GoalsController(goalsService);
  });

  describe('createGoal', () => {
    it('目標を作成できる', () => {});
  });
  describe('getGoals', () => {});
  describe('getGoal', () => {});
});
