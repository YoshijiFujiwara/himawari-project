import { UserEntity } from './user.entity';

describe('User Entity', () => {
  let user: UserEntity;

  beforeEach(() => {
    user = new UserEntity();
    user.id = 1;
    user.username = '田中太郎';
    user.email = 'tanaka@example.com';
    user.password = 'dummypassword';
  });

  describe('transformToSerializer', () => {
    it('シリアライズする', () => {
      const result = user.transformToSerializer();
      expect(result.id).toEqual(1);
      expect(result.username).toEqual('田中太郎');
      expect(result.email).toEqual('tanaka@example.com');
      // パスワードは含まれないこと
      expect(Object(result as any).hasOwnProperty('password')).toEqual(false);
    });
  });
});
