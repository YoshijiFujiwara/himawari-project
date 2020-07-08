import { UserEntity } from '../auth/user.entity';
import { GroupEntity } from './group.entity';
import { Test } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserRepository } from '../auth/user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { GoalRepository } from '../goals/goal.repository';

const mockGroupRepository = () => ({
  createGroup: jest.fn(),
});
const mockGoalRepository = () => ({});
const mockUserRepository = () => ({});
const mockGoalRepository = () => ({});
const mockMailserService = () => ({});

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

export const buildGroup = ({ id, name, user }): GroupEntity => {
  const group = new GroupEntity();
  group.id = id;
  group.name = name;
  group.users = [user];
  group.createdAt = new Date();
  group.updatedAt = new Date();
  return group;
};

describe('GroupsService', () => {
  let groupsService;
  let groupRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: GroupRepository, useFactory: mockGroupRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: GoalRepository, useFactory: mockGoalRepository },
        { provide: MailerService, useFactory: mockMailserService },
      ],
    }).compile();

    groupsService = await module.get<GroupsService>(GroupsService);
    groupRepository = await module.get<GroupRepository>(GroupRepository);
  });

  describe('createGroup', () => {
    it('groupRepository()が呼ばれ、結果を返却する', async () => {
      const group = buildGroup({
        id: 1,
        name: 'ひまわり',
        user: mockUser,
      });
      groupRepository.createGroup.mockResolvedValue(group);

      const createGroupDto: CreateGroupDto = {
        name: group.name,
      };
      const result = await groupsService.createGroup(createGroupDto, mockUser);
      expect(groupRepository.createGroup).toHaveBeenCalledWith(
        createGroupDto,
        mockUser,
      );
      expect(result).toEqual(group);
    });
  });
});
