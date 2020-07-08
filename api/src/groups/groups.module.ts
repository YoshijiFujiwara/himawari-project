import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './group.repository';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../auth/user.repository';
import { GoalRepository } from '../goals/goal.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([GoalRepository]),
    AuthModule,
  ],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
