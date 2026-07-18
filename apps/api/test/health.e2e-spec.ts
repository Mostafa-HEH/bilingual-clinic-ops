import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

interface HealthResponse {
  status: string;
  info: Record<string, { status: string }>;
}

describe('GET /health (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('reports app and database up', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);

    const body = res.body as HealthResponse;
    expect(body.status).toBe('ok');
    expect(body.info.database.status).toBe('up');
  });
});
