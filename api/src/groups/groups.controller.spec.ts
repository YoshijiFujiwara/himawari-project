import { UserEntity } from '../auth/user.entity';
import { GroupEntity } from './group.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { buildGroup } from './groups.service.spec';
import { UserRepository } from 'src/auth/user.repository';
import { MailerService } from '@nestjs-modules/mailer';

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

describe('GroupController', () => {
  let groupsController: GroupsController;
  let groupsService: GroupsService;

  beforeEach(() => {
    // tslint:disable-next-line:prefer-const
    let groupRepository: GroupRepository;
    // tslint:disable-next-line:prefer-const
    let userRepository: UserRepository;
    // tslint:disable-next-line:prefer-const
    let mailerService: MailerService;

    groupsService = new GroupsService(
      groupRepository,
      userRepository,
      mailerService,
    );
    groupsController = new GroupsController(groupsService);
  });

  describe('createGroup', () => {
    it('グループを作成する', async () => {
      const createGroupDto: CreateGroupDto = {
        name: 'ひまわり',
      };
      const newGroup: GroupEntity = buildGroup({
        id: 1,
        name: createGroupDto.name,
        user: mockUser,
      });
      jest
        .spyOn(groupsService, 'createGroup')
        .mockImplementation(() => Promise.resolve(newGroup));

      expect(
        await groupsController.createGroup(createGroupDto, mockUser),
      ).toStrictEqual(newGroup.transformToSerializer());
    });
  });
});
