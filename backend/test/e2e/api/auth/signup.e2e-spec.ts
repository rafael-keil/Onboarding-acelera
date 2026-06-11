import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { DatabaseMockModel, createTestApp, queryFunction } from '@test/utils'

describe('ApiController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createTestApp()
  })

  it('Deve criar um usuário com sucesso', async () => {
    jest.spyOn(DatabaseMockModel, 'create').mockReturnValueOnce(queryFunction({}))

    await request(app.getHttpServer())
      .post('/user')
      .send({ email: 'fulaninho@bbc.com.br', password: 'abc124' })
      .expect(201)

    expect(DatabaseMockModel.create).toHaveBeenCalledTimes(1)
  })

  afterAll(async () => {
    await app.close()
  })
})
