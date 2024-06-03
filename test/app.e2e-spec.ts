import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ANIMALTYPE } from './../db/types';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    if (process.env.NODE_ENV !== 'testing') {
      throw new Error('Please change your environment to "testing"');
    }
  });

  afterAll(async () => {
    if (app) {
      await app.close();
      console.log('app closed...');
    } else console.log('app is not closed');
  });

  it('/GET animals', async () => {
    return await request(app.getHttpServer())
      .get('/animals')
      .expect(HttpStatus.OK);
  });

  it('/POST animal', async () => {
    return await request(app.getHttpServer())
      .post('/animals')
      .send({ name: 'FAKE_ANIMAL', type: ANIMALTYPE.BIRD })
      .expect(HttpStatus.CREATED);
  });
  it('/UPDATE animal', async () => {
    const response = await request(app.getHttpServer()).get('/animals');
    const id = response.body.at(-1).id;
    return await request(app.getHttpServer())
      .patch(`/animals/${id}`)
      .send({ name: 'UPDATED_FAKE_ANIMAL' })
      .expect(204);
  });

  it('/DELETE animal', async () => {
    const response = await request(app.getHttpServer()).get('/animals');
    const id = response.body.at(-1).id;
    return await request(app.getHttpServer())
      .delete(`/animals/${id}`)
      .expect(204);
  });
});

// how to clear db
