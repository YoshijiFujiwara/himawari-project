import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsController } from './commits.controller';

@Module({
  providers: [CommitsService],
  controllers: [CommitsController]
})
export class CommitsModule {}
