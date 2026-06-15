import { ConflictException } from '@nestjs/common'
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

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(userRepository.create).toHaveBeenCalledTimes(1)
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(String), email)

    const [hashedPassword] = userRepository.create.mock.calls[0]
    expect(hashedPassword).not.toBe(password)
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true)
  })

  it('Deve lançar erro quando email já existe', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(user)

    await expect(useCase.exec({ password, email })).rejects.toThrow(
      new ConflictException('Email já cadastrado'),
    )

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(userRepository.create).not.toHaveBeenCalled()
  })
})
