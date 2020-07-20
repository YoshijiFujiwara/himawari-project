import { Module } from '@nestjs/common';
import { SearchesController } from './searches.controller';
import { SearchesService } from './searches.service';

@Module({
  controllers: [SearchesController],
  providers: [SearchesService],
})
export class SearchesModule {}
