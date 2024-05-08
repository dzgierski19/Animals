import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AnimalsModule } from './animals/animals.module';
import { DatabaseAdapter } from './database/database.service';
import {
  LoggerMiddleware,
  pagination,
} from './middleware/pagination.middleware';
import { AnimalsController } from './animals/animals.controller';
import { AnimalsService } from './animals/animals.service';

@Module({
  providers: [AnimalsModule],
  // controllers: [AnimalsController],
  // providers: [DatabaseAdapter, AnimalsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'animals', method: RequestMethod.GET });
  }
}
