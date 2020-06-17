import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommitRepository } from './commit.repository';
import { CreateCommitDto } from './dto/create-commit.dto';
import { GoalEntity } from '../goals/goal.entity';

@Injectable()
export class CommitsService {
  constructor(
    @InjectRepository(CommitRepository)
    private commitRepository: CommitRepository,
  ) {}

  async createCommit(createCommitDto: CreateCommitDto, goalId: number) {}
}
