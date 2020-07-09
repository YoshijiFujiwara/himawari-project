import { Module } from '@nestjs/common';
import { TimelinesController } from './timelines.controller';
import { TimelinesService } from './timelines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelineRepository } from './timeline.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TimelineRepository]), AuthModule],
  controllers: [TimelinesController],
  providers: [TimelinesService],
})
export class TimelinesModule {}
