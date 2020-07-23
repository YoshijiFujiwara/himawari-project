import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalRepository } from './goal.repository';
import { AuthModule } from '../auth/auth.module';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';
import { CommitRepository } from '../commits/commit.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoalRepository]),
    TypeOrmModule.forFeature([CommitRepository]),
    TypeOrmModule.forFeature([TimelineRepository]),
    TypeOrmModule.forFeature([GroupRepository]),
    AuthModule,
  ],
  providers: [GoalsService],
  controllers: [GoalsController],
})
export class GoalsModule {}
