import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { AnimalsDatabaseAdapter } from './animals.db.adapter';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AnimalsController],
  providers: [
    AnimalsService,
    {
      provide: 'IDatabaseAdapter',
      useClass: AnimalsDatabaseAdapter,
    },
  ],
  exports: [AnimalsService],
})
export class AnimalsModule {}
