import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { createTestApp } from '@test/utils'

describe('AppController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createTestApp()
  })

  it('/healthcheck', async () => {
    await request(app.getHttpServer()).get('/healthcheck').expect(200).expect('OK')
  })

  afterAll(async () => {
    await app.close()
  })
})
