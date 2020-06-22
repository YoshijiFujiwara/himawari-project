import { GroupRepository } from './group.repository';
import { GroupEntity } from './group.entity';
import { UserEntity } from '../auth/user.entity';

describe('GroupRepository', () => {
  let group: GroupEntity;
  let mockUser: UserEntity;

  beforeEach(() => {
    mockUser = new UserEntity();
    mockUser.id = 1;
    mockUser.username = 'ひまわり太郎';
    mockUser.email = 'himawari@example.com';

    group = new GroupEntity();
    group.id = 1;
    group.name = 'himawari';
    group.ownerId = mockUser.id;
    group.owner = mockUser;
    group.createdAt = new Date();
    group.updatedAt = new Date();
  });

  describe('transformToSerializer', () => {
    it('シリアライズする', () => {
      const result = group.transformToSerializer();
      expect(result.id).toEqual(group.id);
      expect(result.owner).toEqual(group.owner.transformToSerializer());
      expect(result.ownerId).toEqual(group.ownerId);
      expect(result.createdAt).toEqual(group.createdAt);

      // updatedAtは含まれないこと
      expect(Object(result as any).hasOwnProperty('updatedAt')).toEqual(false);
    });
  });
});
