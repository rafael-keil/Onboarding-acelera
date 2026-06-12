import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { VALIDATION_MESSAGE_BUILDER } from '@core/constants'

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
    const findOneSpy = jest
      .spyOn(DatabaseMockModel, 'findOne')
      .mockReturnValueOnce(queryFunction(null))
    const createSpy = jest.spyOn(DatabaseMockModel, 'create').mockReturnValueOnce(queryFunction({}))

    const email = 'fulaninho@bbc.com.br'
    const password = 'abc124'

    await request(app.getHttpServer()).post('/auth/signup').send({ email, password }).expect(201)

    expect(findOneSpy).toHaveBeenCalledTimes(1)
    expect(findOneSpy).toHaveBeenCalledWith({ email })
    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith({
      email,
      password: expect.any(String),
    })
  })

  it('Deve retornar erro quando email não é string', async () => {
    const findOneSpy = jest.spyOn(DatabaseMockModel, 'findOne')
    const createSpy = jest.spyOn(DatabaseMockModel, 'create')

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 123, password: 'abc123' })
      .expect(400)

    expect(body.messages).toContain(
      VALIDATION_MESSAGE_BUILDER.isString().replace('$property', 'email'),
    )
    expect(findOneSpy).not.toHaveBeenCalled()
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando email é inválido', async () => {
    const findOneSpy = jest.spyOn(DatabaseMockModel, 'findOne')
    const createSpy = jest.spyOn(DatabaseMockModel, 'create')

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'email-invalido', password: 'abc123' })
      .expect(400)

    expect(body.messages).toContain(
      VALIDATION_MESSAGE_BUILDER.isEmail().replace('$property', 'email'),
    )
    expect(findOneSpy).not.toHaveBeenCalled()
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando senha é fraca por não possuir número', async () => {
    const findOneSpy = jest.spyOn(DatabaseMockModel, 'findOne')
    const createSpy = jest.spyOn(DatabaseMockModel, 'create')

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'fulaninho@bbc.com.br', password: 'abcdef' })
      .expect(400)

    expect(body.messages).toContain(
      VALIDATION_MESSAGE_BUILDER.matches().replace('$property', 'password'),
    )
    expect(findOneSpy).not.toHaveBeenCalled()
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando senha é fraca por possuir menos de 6 caracteres', async () => {
    const findOneSpy = jest.spyOn(DatabaseMockModel, 'findOne')
    const createSpy = jest.spyOn(DatabaseMockModel, 'create')

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'fulaninho@bbc.com.br', password: 'ab1' })
      .expect(400)

    expect(body.messages).toContain(
      VALIDATION_MESSAGE_BUILDER.minLength(6).replace('$property', 'password'),
    )
    expect(findOneSpy).not.toHaveBeenCalled()
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando email já existe', async () => {
    const email = 'fulaninho@bbc.com.br'
    const findOneSpy = jest
      .spyOn(DatabaseMockModel, 'findOne')
      .mockReturnValueOnce(queryFunction({ email }))
    const createSpy = jest.spyOn(DatabaseMockModel, 'create')

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'abc123' })
      .expect(409)

    expect(body.messages).toContain('Email já cadastrado')
    expect(findOneSpy).toHaveBeenCalledTimes(1)
    expect(findOneSpy).toHaveBeenCalledWith({ email })
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando email já existe com caixa diferente', async () => {
    const normalizedEmail = 'fulaninho@bbc.com.br'
    const findOneSpy = jest
      .spyOn(DatabaseMockModel, 'findOne')
      .mockReturnValueOnce(queryFunction({ email: normalizedEmail }))
    const createSpy = jest.spyOn(DatabaseMockModel, 'create')

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: '  FULANINHO@BBC.COM.BR  ', password: 'abc123' })
      .expect(409)

    expect(body.messages).toContain('Email já cadastrado')
    expect(findOneSpy).toHaveBeenCalledTimes(1)
    expect(findOneSpy).toHaveBeenCalledWith({ email: normalizedEmail })
    expect(createSpy).not.toHaveBeenCalled()
  })
})
