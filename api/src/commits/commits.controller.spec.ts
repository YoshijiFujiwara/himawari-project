import { UserEntity } from '../auth/user.entity';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';
import { CommitRepository } from './commit.repository';
import { GoalRepository } from '../goals/goal.repository';
import { CreateCommitDto } from './dto/create-commit.dto';
import { buildCommit } from './commits.service.spec';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';

const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.username = 'ひまわり太郎';
mockUser.email = 'himawari@example.com';

describe('commitsController', () => {
  let commitsController: CommitsController;
  let commitsService: CommitsService;

  beforeEach(() => {
    // tslint:disable-next-line:prefer-const
    let commitRepository: CommitRepository;
    // tslint:disable-next-line:prefer-const
    let goalRepository: GoalRepository;
    // tslint:disable-next-line:prefer-const
    let timelineRepository: TimelineRepository;
    // tslint:disable-next-line:prefer-const
    let groupRepository: GroupRepository;

    commitsService = new CommitsService(
      commitRepository,
      goalRepository,
      timelineRepository,
      groupRepository,
    );
    commitsController = new CommitsController(commitsService);
  });

  describe('createCommit', () => {
    it('学習記録を作成できる', async () => {
      const createCommitDto: CreateCommitDto = {
        title: 'リスニング',
        description: '30分',
        studyHours: 0,
        studyMinutes: 30,
      };
      const newCommit = buildCommit({
        id: 1,
        title: createCommitDto.title,
        description: createCommitDto.description,
        studyTime: '00:30',
      });
      jest
        .spyOn(commitsService, 'createCommit')
        .mockImplementation(() => Promise.resolve(newCommit));

      expect(
        await commitsController.createCommit(createCommitDto, 1, mockUser),
      ).toStrictEqual(newCommit.transformToSerializer());
    });
  });
});
