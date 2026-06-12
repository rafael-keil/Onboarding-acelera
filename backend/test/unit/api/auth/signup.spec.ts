import { BadRequestException, ConflictException } from '@nestjs/common'
import { SignupUseCase } from '@src/routes/api/auth/use-cases'
import * as bcrypt from 'bcrypt'
import { Types } from 'mongoose'

import { User } from '@core/repositories/user/schemas'
import { UserRepository } from '@core/repositories/user/user.repository'

describe('SignupUseCase', () => {
  let useCase: SignupUseCase
  let userRepository: jest.Mocked<Pick<UserRepository, 'create' | 'findByEmail'>>

  beforeAll(() => {
    userRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    }

    useCase = new SignupUseCase(userRepository as unknown as UserRepository)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const email = 'fulaninho@bbc.com.br'
  const password = 'abc123'

  const user: User = {
    _id: new Types.ObjectId(),
    email,
    password,
  }

  it('Deve criar um usuário com sucesso', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(null)
    userRepository.create.mockResolvedValueOnce(user)

    await useCase.exec({ password, email })

    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(userRepository.create).toHaveBeenCalledTimes(1)

    const [hashedPassword, savedEmail] = userRepository.create.mock.calls[0]
    expect(savedEmail).toBe(email)
    expect(hashedPassword).not.toBe(password)
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true)
  })

  it('Deve lançar erro quando email é inválido', async () => {
    await expect(useCase.exec({ email: 'email-invalido', password })).rejects.toThrow(
      new BadRequestException('Email inválido'),
    )
  })

  it('Deve lançar erro quando senha não possui número', async () => {
    await expect(useCase.exec({ email, password: 'abcdef' })).rejects.toThrow(
      new BadRequestException('Senha fraca'),
    )
  })

  it('Deve lançar erro quando senha possui menos de 6 caracteres', async () => {
    await expect(useCase.exec({ email, password: 'ab1' })).rejects.toThrow(
      new BadRequestException('Senha fraca'),
    )
  })

  it('Deve lançar erro quando email já existe', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(user)

    await expect(useCase.exec({ password, email })).rejects.toThrow(
      new ConflictException('Email já cadastrado'),
    )
  })
})
