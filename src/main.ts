import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
}

bootstrap();
