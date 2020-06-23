import { GoalEntity } from './goal.entity';
import { UserEntity } from '../auth/user.entity';

describe('GoanEntity', () => {
  let goal: GoalEntity;
  let mockUser: UserEntity;

  beforeEach(() => {
    mockUser = new UserEntity();
    mockUser.id = 1;
    mockUser.username = 'ひまわり太郎';
    mockUser.email = 'himawari@example.com';

    goal = new GoalEntity();
    goal.id = 1;
    goal.title = 'toeic';
    goal.description = '海外留学のため';
    goal.isPublic = true;
    goal.user = mockUser;
    goal.userId = mockUser.id;
    goal.commits = [];
    goal.createdAt = new Date();
    goal.updatedAt = new Date();
  });

  describe('transformToSerializer', () => {
    it('シリアライズする', () => {
      const result = goal.transformToSerializer();
      expect(result.id).toEqual(goal.id);
      expect(result.title).toEqual(goal.title);
      expect(result.description).toEqual(goal.description);
      expect(result.isPublic).toEqual(goal.isPublic);
      expect(result.user).toEqual(goal.user.transformToSerializer());
      expect(result.userId).toEqual(goal.userId);
      expect(result.createdAt).toEqual(goal.createdAt);

      // updatedAtは含まれないこと
      expect(Object(result as any).hasOwnProperty('updatedAt')).toEqual(false);
    });
  });
});
