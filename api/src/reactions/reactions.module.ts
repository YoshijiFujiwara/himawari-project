import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ReactionRepository } from './reaction.repository';
import { TimelineRepository } from '../timelines/timeline.repository';
import { GroupRepository } from '../groups/group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionRepository]),
    TypeOrmModule.forFeature([TimelineRepository]),
    TypeOrmModule.forFeature([GroupRepository]),
    AuthModule,
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionsModule {}
