import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Types } from 'mongoose'
import * as request from 'supertest'

import { VALIDATION_MESSAGE_BUILDER } from '@core/constants'

import { DatabaseMockModel, TemporaryStorageMock, createTestApp, queryFunction } from '@test/utils'

describe('AuthController (login)', () => {
  let app: INestApplication
  let jwtService: JwtService

  beforeAll(async () => {
    app = await createTestApp()
    jwtService = app.get(JwtService)
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Deve autenticar um usuário com sucesso', async () => {
    const email = 'fulaninho@bbc.com.br'
    const password = 'abc123'
    const userId = new Types.ObjectId()
    const hashedPassword = await bcrypt.hash(password, 10)

    jest
      .spyOn(DatabaseMockModel, 'findOne')
      .mockReturnValueOnce(queryFunction({ _id: userId, email, password: hashedPassword }))

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200)

    expect(body.token).toEqual(expect.any(String))

    const payload = await jwtService.verifyAsync(body.token)
    expect(payload.userId).toBe(userId.toString())

    expect(TemporaryStorageMock.set).toHaveBeenCalledTimes(1)
    expect(TemporaryStorageMock.set).toHaveBeenCalledWith({
      key: `auth:${userId.toString()}:${body.token}`,
      value: body.token,
      ttlInMinutes: 60,
    })
  })

  it('Deve retornar erro quando email não é string', async () => {
    const findOneSpy = jest.spyOn(DatabaseMockModel, 'findOne')

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 123, password: 'abc123' })
      .expect(400)

    expect(body.messages).toContain(
      VALIDATION_MESSAGE_BUILDER.isString().replace('$property', 'email'),
    )
    expect(findOneSpy).not.toHaveBeenCalled()
    expect(TemporaryStorageMock.set).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando email é inválido', async () => {
    const findOneSpy = jest.spyOn(DatabaseMockModel, 'findOne')

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'email-invalido', password: 'abc123' })
      .expect(400)

    expect(body.messages).toContain(
      VALIDATION_MESSAGE_BUILDER.isEmail().replace('$property', 'email'),
    )
    expect(findOneSpy).not.toHaveBeenCalled()
    expect(TemporaryStorageMock.set).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando email não existe', async () => {
    jest.spyOn(DatabaseMockModel, 'findOne').mockReturnValueOnce(queryFunction(null))

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'fulaninho@bbc.com.br', password: 'abc123' })
      .expect(401)

    expect(body.messages).toContain('Credenciais inválidas')
    expect(TemporaryStorageMock.set).not.toHaveBeenCalled()
  })

  it('Deve retornar erro quando senha está incorreta', async () => {
    const email = 'fulaninho@bbc.com.br'
    const hashedPassword = await bcrypt.hash('abc123', 10)

    jest
      .spyOn(DatabaseMockModel, 'findOne')
      .mockReturnValueOnce(
        queryFunction({ _id: new Types.ObjectId(), email, password: hashedPassword }),
      )

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'senha-errada' })
      .expect(401)

    expect(body.messages).toContain('Senha incorreta')
    expect(TemporaryStorageMock.set).not.toHaveBeenCalled()
  })
})
