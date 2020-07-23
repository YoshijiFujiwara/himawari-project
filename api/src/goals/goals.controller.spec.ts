import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalRepository } from './goal.repository';
import { UserEntity } from '../auth/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalEntity } from './goal.entity';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';
import { CommitRepository } from '../commits/commit.repository';

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

const buildGoal = ({ id, title, description, isPublic, user }): GoalEntity => {
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

describe('goalsController', () => {
  let goalsController: GoalsController;
  let goalsService: GoalsService;

  beforeEach(() => {
    // tslint:disable-next-line:prefer-const
    let goalRepository: GoalRepository;
    // tslint:disable-next-line:prefer-const
    let commitRepository: CommitRepository;
    // tslint:disable-next-line:prefer-const
    let timelineRepository: TimelineRepository;
    // tslint:disable-next-line:prefer-const
    let groupRepository: GroupRepository;
    goalsService = new GoalsService(
      goalRepository,
      commitRepository,
      timelineRepository,
      groupRepository,
    );
    goalsController = new GoalsController(goalsService);
  });

  describe('createGoal', () => {
    it('目標を作成できる', async () => {
      const createGoalDto: CreateGoalDto = {
        title: 'TOEIC900点',
        description: 'レッツ海外留学',
        isPublic: true,
      };
      const newGoal: GoalEntity = buildGoal({
        id: 1,
        ...createGoalDto,
        user: mockUser,
      });
      jest
        .spyOn(goalsService, 'createGoal')
        .mockImplementation(() => Promise.resolve(newGoal));

      expect(
        await goalsController.createGoal(createGoalDto, mockUser),
      ).toStrictEqual(newGoal.transformToSerializer());
    });
  });

  describe('getGoals', () => {
    it('目標の一覧を取得できる', async () => {
      const goals: GoalEntity[] = [
        buildGoal({
          id: 1,
          title: 'TOEIC900点',
          description: 'レッツ海外留学',
          isPublic: true,
          user: mockUser,
        }),
        buildGoal({
          id: 2,
          title: 'TOEIC930点',
          description: 'レッツ海外留学2',
          isPublic: false,
          user: mockUser,
        }),
      ];
      jest
        .spyOn(goalsService, 'getGoals')
        .mockImplementation(() => Promise.resolve(goals));

      const result = await goalsController.getGoals(mockUser);
      expect(result.length).toEqual(2);
      expect(result).toStrictEqual(goals.map(g => g.transformToSerializer()));
    });
  });

  describe('getGoal', () => {
    it('目標の詳細情報を取得できる', async () => {
      const goal: GoalEntity = buildGoal({
        id: 1,
        title: 'TOEIC900点',
        description: 'レッツ海外留学',
        isPublic: true,
        user: mockUser,
      });
      jest
        .spyOn(goalsService, 'getGoal')
        .mockImplementation(() => Promise.resolve(goal));

      const result = await goalsController.getGoal(1, mockUser);
      expect(result).toStrictEqual(goal.transformToSerializer());
    });
  });
});
