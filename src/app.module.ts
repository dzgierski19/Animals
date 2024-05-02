import { Module } from '@nestjs/common';

import { AnimalsModule } from './animals/animals.module';
import { mockDatabaseService } from './database-mock/database-mock.service';

@Module({
  imports: [AnimalsModule],
  providers: [mockDatabaseService],
})
export class AppModule {}
