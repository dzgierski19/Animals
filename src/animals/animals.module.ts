import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService, DatabaseService],
  exports: [AnimalsService],
})
export class AnimalsModule {}
