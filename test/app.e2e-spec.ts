import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  DatabaseAdapter,
  IDatabaseAdapter,
} from './../src/database/database.service';
import {
  AnimalsService,
  IAnimalsService,
} from './../src/animals/animals.service';
import { AnimalsController } from './../src/animals/animals.controller';
import { AppModule } from './../src/app.module';
import { ANIMALTYPE, Animal, AnimalToCreate } from 'db/types';
import knex, { Knex } from 'knex';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let knexInstance: Knex;
  let animalsService = { getAll: () => ['test'] };
  let animalsServ: IAnimalsService;
  let animalsController: AnimalsController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(DatabaseAdapter)
      // .useValue(TestDatabaseAdapterService)
      .compile();
    process.env.NODE_ENV = 'testing';
    app = moduleFixture.createNestApplication();
    await app.init();

    // testDatabaseAdapter = new TestDatabaseAdapterService();
    // animalsServ = new AnimalsService(testDatabaseAdapter);
  });

  it('/GET animals', () => {
    return request(app.getHttpServer())
      .get('/animals')
      .expect(HttpStatus.OK)
      .expect([]);
    // .expect(fakeAnimal);l;
  });

  it('/POST animals', () => {
    const newAnimal: AnimalToCreate = {
      name: 'FAKE_ANIMAL',
      type: ANIMALTYPE.BIRD,
    };
    return request(app.getHttpServer())
      .post('/animals')
      .send(newAnimal)
      .expect(HttpStatus.CREATED);
  });

  afterEach(async () => {
    await app.close();
  });
});

// how to clear db
