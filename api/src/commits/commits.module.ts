import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsController } from './commits.controller';
import { CommitRepository } from './commit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommitRepository]), AuthModule],
  providers: [CommitsService],
  controllers: [CommitsController],
})
export class CommitsModule {}
