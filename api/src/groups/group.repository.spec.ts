import { CreateGroupDto } from './dto/create-group.dto';
import { Test } from '@nestjs/testing';
import { GroupRepository } from './group.repository';

const createGroupDto: CreateGroupDto = {
  name: 'himawari',
};

describe('groupRepository', () => {
  let groupRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GroupRepository],
    }).compile();

    groupRepository = await module.get<GroupRepository>(GroupRepository);
  });

  describe('createGroup', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      groupRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('グループを作成する', () => {
      save.mockResolvedValue(undefined);
      expect(groupRepository.createGroup(createGroupDto));
    });
  });
});
