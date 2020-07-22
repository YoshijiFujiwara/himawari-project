import { Module } from '@nestjs/common';
import { SearchesController } from './searches.controller';
import { SearchesService } from './searches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [SearchesController],
  providers: [SearchesService],
})
export class SearchesModule {}
