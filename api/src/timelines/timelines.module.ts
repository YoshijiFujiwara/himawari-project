import { Module } from '@nestjs/common';
import { TimelinesController } from './timelines.controller';
import { TimelinesService } from './timelines.service';

@Module({
  controllers: [TimelinesController],
  providers: [TimelinesService]
})
export class TimelinesModule {}
