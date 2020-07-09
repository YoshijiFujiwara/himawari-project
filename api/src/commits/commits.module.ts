import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsController } from './commits.controller';
import { CommitRepository } from './commit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { GoalRepository } from '../goals/goal.repository';
import { TimelineRepository } from '../timelines/timeline.repository';
import { UserRepository } from '../auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommitRepository]),
    TypeOrmModule.forFeature([GoalRepository]),
    TypeOrmModule.forFeature([TimelineRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
  ],
  providers: [CommitsService],
  controllers: [CommitsController],
})
export class CommitsModule {}
