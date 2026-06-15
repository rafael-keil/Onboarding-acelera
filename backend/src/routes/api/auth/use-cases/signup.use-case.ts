import { Injectable } from '@nestjs/common'

import { UserRepository } from '@core/repositories'

import { SignupParams } from '../types'

const SALT_OR_ROUNDS = 10

@Injectable()
export class SignupUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec({ email, password }: SignupParams) {
    await this.userRepository.create(password, email)
  }
}
