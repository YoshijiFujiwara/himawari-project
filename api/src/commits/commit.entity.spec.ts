import { CommitEntity } from './commit.entity';
import { UserEntity } from '../auth/user.entity';
import { buildGoal } from '../goals/goals.service.spec';

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

describe('CommitEntity', () => {
  let commit: CommitEntity;

  beforeEach(() => {
    commit = new CommitEntity();
    commit.id = 1;
    commit.title = 'toeic900';
    commit.description = '海外留学';
    commit.studyTime = '01:10';
    commit.goalId = 1;
    commit.goal = buildGoal({
      id: 1,
      title: 'TOEIC900点',
      description: 'レッツ海外留学',
      isPublic: true,
      user: mockUser,
    });
  });

  describe('transformToSerializer', () => {
    it('シリアライズする', () => {
      const result = commit.transformToSerializer();
      expect(result.id).toEqual(1);
      expect(result.title).toEqual(commit.title);
      expect(result.description).toEqual(commit.description);
      expect(result.studyHours).toEqual(1);
      expect(result.studyMinutes).toEqual(10);
      expect(result.goalId).toEqual(1);
      expect(result.goal).toStrictEqual(commit.goal.transformToSerializer());

      expect(result.createdAt).toEqual(commit.createdAt);

      // updatedAtは含まれないこと
      expect(Object(result as any).hasOwnProperty('updatedAt')).toEqual(false);
    });
  });
});
