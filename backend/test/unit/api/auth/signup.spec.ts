import { Test } from '@nestjs/testing'
import { SignupUseCase } from '@src/routes/api/auth/use-cases'
import { Types } from 'mongoose'

import { User } from '@core/repositories/user/schemas'
import { UserRepository } from '@core/repositories/user/user.repository'

describe('SignupUseCase', () => {
  let useCase: SignupUseCase
  let userRepository: UserRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [{ provide: UserRepository, useValue: { create: () => null } }],
    }).compile()

    userRepository = moduleRef.get(UserRepository)
    useCase = new SignupUseCase(userRepository)
  })

  const email = 'fulaninho@bbc.com.br'
  const password = 'abc123'

  const user: User = {
    _id: new Types.ObjectId(),
    email,
    password,
  }

  it('Deve criar um usuário com sucesso', async () => {
    jest.spyOn(userRepository, 'create').mockResolvedValueOnce(user)

    await useCase.exec({ password, email })

    expect(userRepository.create).toHaveBeenCalledTimes(1)
    expect(userRepository.create).toHaveBeenCalledWith(password, email)
  })
})
