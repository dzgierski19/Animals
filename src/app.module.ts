import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AnimalsModule } from './animals/animals.module';
import { LoggerMiddleware } from './middleware/pagination.middleware';

@Module({
  imports: [AnimalsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'animals', method: RequestMethod.GET });
  }
}
