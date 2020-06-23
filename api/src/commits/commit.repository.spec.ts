import { CreateCommitDto } from './dto/create-commit.dto';
import { Test } from '@nestjs/testing';
import { CommitRepository } from './commit.repository';

const createCommitDto: CreateCommitDto = {
  title: 'リスニング',
  description: '30分',
  studyHours: 0,
  studyMinutes: 30,
};

describe('commitRepository', () => {
  let commitRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CommitRepository],
    }).compile();

    commitRepository = await module.get<CommitRepository>(CommitRepository);
  });

  describe('createCommit', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      commitRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('目標を追加する', () => {
      save.mockResolvedValue(undefined);
      expect(commitRepository.createCommit(createCommitDto));
    });
  });
});
