import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { DatabaseAdapter } from './../database/database.service';
import { AnimalsController } from './animals.controller';

@Module({
  controllers: [AnimalsController],
  providers: [DatabaseAdapter, AnimalsService],
  exports: [AnimalsService],
})
export class AnimalsModule {}
