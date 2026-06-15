import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginUseCase } from '@src/routes/api/auth/use-cases'
import * as bcrypt from 'bcrypt'
import { Types } from 'mongoose'

import { TemporaryStorageProvider } from '@core/providers'
import { User } from '@core/repositories/user/schemas'
import { UserRepository } from '@core/repositories/user/user.repository'

describe('LoginUseCase', () => {
  let useCase: LoginUseCase
  let userRepository: jest.Mocked<Pick<UserRepository, 'findByEmail'>>
  let jwtService: jest.Mocked<Pick<JwtService, 'signAsync'>>
  let temporaryStorageProvider: jest.Mocked<Pick<TemporaryStorageProvider, 'set'>>

  beforeAll(() => {
    userRepository = {
      findByEmail: jest.fn(),
    }

    jwtService = {
      signAsync: jest.fn(),
    }

    temporaryStorageProvider = {
      set: jest.fn(),
    }

    useCase = new LoginUseCase(
      userRepository as unknown as UserRepository,
      jwtService as unknown as JwtService,
      temporaryStorageProvider as unknown as TemporaryStorageProvider,
    )
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const email = 'fulaninho@bbc.com.br'
  const password = 'abc123'
  const userId = new Types.ObjectId()

  const user: User = {
    _id: userId,
    email,
    password: 'hashed-password',
  }

  it('Deve autenticar um usuário com sucesso', async () => {
    const token = 'jwt-token'
    userRepository.findByEmail.mockResolvedValueOnce(user)
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)
    jwtService.signAsync.mockResolvedValueOnce(token)
    temporaryStorageProvider.set.mockResolvedValueOnce(undefined)

    const result = await useCase.exec({ email, password })

    expect(result).toEqual({ token })
    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password)
    expect(jwtService.signAsync).toHaveBeenCalledTimes(1)
    expect(jwtService.signAsync).toHaveBeenCalledWith({ userId: userId.toString() })
    expect(temporaryStorageProvider.set).toHaveBeenCalledTimes(1)
    expect(temporaryStorageProvider.set).toHaveBeenCalledWith({
      key: `auth:${userId.toString()}:${token}`,
      value: token,
      ttlInMinutes: 60,
    })
  })

  it('Deve lançar erro quando email não existe', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(null)

    await expect(useCase.exec({ email, password })).rejects.toThrow(
      new UnauthorizedException('Credenciais inválidas'),
    )

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(jwtService.signAsync).not.toHaveBeenCalled()
    expect(temporaryStorageProvider.set).not.toHaveBeenCalled()
  })

  it('Deve lançar erro quando senha está incorreta', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(user)
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

    await expect(useCase.exec({ email, password })).rejects.toThrow(
      new UnauthorizedException('Senha incorreta'),
    )

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password)
    expect(jwtService.signAsync).not.toHaveBeenCalled()
    expect(temporaryStorageProvider.set).not.toHaveBeenCalled()
  })
})
