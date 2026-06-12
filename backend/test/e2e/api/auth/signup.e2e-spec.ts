import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { DatabaseMockModel, createTestApp, queryFunction } from '@test/utils'

describe('AuthController (signup)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createTestApp()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Deve criar um usuário com sucesso', async () => {
    jest.spyOn(DatabaseMockModel, 'findOne').mockReturnValueOnce(queryFunction(null))
    const createSpy = jest.spyOn(DatabaseMockModel, 'create').mockReturnValueOnce(queryFunction({}))

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'fulaninho@bbc.com.br', password: 'abc124' })
      .expect(201)

    expect(DatabaseMockModel.findOne).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledTimes(1)
  })

  it('Deve retornar erro quando email é inválido', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'email-invalido', password: 'abc123' })
      .expect(400)

    expect(body.messages).toContain('Email inválido')
  })

  it('Deve retornar erro quando senha é fraca', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'fulaninho@bbc.com.br', password: 'abcdef' })
      .expect(400)

    expect(body.messages).toContain('Senha fraca')
  })

  it('Deve retornar erro quando email já existe', async () => {
    jest
      .spyOn(DatabaseMockModel, 'findOne')
      .mockReturnValueOnce(queryFunction({ email: 'fulaninho@bbc.com.br' }))

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'fulaninho@bbc.com.br', password: 'abc123' })
      .expect(409)

    expect(body.messages).toContain('Email já cadastrado')
  })
})
