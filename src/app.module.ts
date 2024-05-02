import { Module } from '@nestjs/common';

import { AnimalsModule } from './animals/animals.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [AnimalsModule],
  providers: [DatabaseService],
})
export class AppModule {}
