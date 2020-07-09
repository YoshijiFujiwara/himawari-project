import { UserEntity } from '../auth/user.entity';
import { Test } from '@nestjs/testing';
import { CommitsService } from './commits.service';
import { CommitRepository } from './commit.repository';
import { buildGoal } from '../goals/goals.service.spec';
import { CommitEntity } from './commit.entity';
import { CreateCommitDto } from './dto/create-commit.dto';
import { GoalRepository } from '../goals/goal.repository';
import { GoalEntity } from '../goals/goal.entity';
import { NotFoundException } from '@nestjs/common';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

export const buildCommit = ({ id, title, description, studyTime }) => {
  const commit = new CommitEntity();
  commit.id = id;
  commit.title = title;
  commit.description = description;
  commit.studyTime = studyTime;
  commit.createdAt = new Date();
  commit.updatedAt = new Date();

  return commit;
};

const mockCommitRepository = () => ({
  createCommit: jest.fn(),
});
const mockGoalRepository = () => ({
  findOne: jest.fn(),
});
const mockTimelineRepository = () => ({
  findOne: jest.fn(),
  syncCommit: jest.fn(),
});
const mockGroupRepository = () => ({
  getGroupsUserMemberOf: jest.fn(),
});

describe('CommitService', () => {
  let commitsService;
  let commitRepository;
  let goalRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CommitsService,
        { provide: GoalRepository, useFactory: mockGoalRepository },
        { provide: CommitRepository, useFactory: mockCommitRepository },
        { provide: TimelineRepository, useFactory: mockTimelineRepository },
        { provide: GroupRepository, useFactory: mockGroupRepository },
      ],
    }).compile();

    commitsService = await module.get<CommitsService>(CommitsService);
    commitRepository = await module.get<CommitRepository>(CommitRepository);
    goalRepository = await module.get<GoalRepository>(GoalRepository);
  });

  describe('createCommit', () => {
    let mockGoal: GoalEntity;
    let createCommitDto: CreateCommitDto;
    let newCommit: CommitEntity;

    beforeEach(() => {
      mockGoal = buildGoal({
        id: 1,
        title: 'TOEIC900点',
        description: 'レッツ海外留学',
        isPublic: true,
        user: mockUser,
      });
      createCommitDto = {
        title: 'リスニング',
        description: '30分',
        studyHours: 0,
        studyMinutes: 30,
      };
      newCommit = buildCommit({
        id: 1,
        title: createCommitDto.title,
        description: createCommitDto.description,
        studyTime: '00:30',
      });
    });
    it('目標を作成する', async () => {
      goalRepository.findOne.mockResolvedValue(mockGoal);
      commitRepository.createCommit.mockResolvedValue(newCommit);

      expect(goalRepository.findOne).not.toHaveBeenCalled();
      expect(commitRepository.createCommit).not.toHaveBeenCalled();

      const result = await commitsService.createCommit(
        createCommitDto,
        1,
        mockUser,
      );
      expect(goalRepository.findOne).toHaveBeenCalled();
      expect(commitRepository.createCommit).toHaveBeenCalled();
      expect(result).toStrictEqual(newCommit);
    });

    it('目標が見つからない場合は、NotFoundExceptionを投げる', () => {
      goalRepository.findOne.mockResolvedValue(null);
      commitRepository.createCommit.mockResolvedValue(newCommit);

      expect(goalRepository.findOne).not.toHaveBeenCalled();
      expect(commitRepository.createCommit).not.toHaveBeenCalled();

      expect(
        commitsService.createCommit(createCommitDto, 1, mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
