import { Test, TestingModule } from '@nestjs/testing';
import { TimelinesController } from './timelines.controller';

describe('Timelines Controller', () => {
  let controller: TimelinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimelinesController],
    }).compile();

    controller = module.get<TimelinesController>(TimelinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
