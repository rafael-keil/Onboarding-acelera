import { Injectable } from '@nestjs/common'

import { UserRepository } from '@core/repositories'

interface SignupParams {
  email: string
  password: string
}

@Injectable()
export class SignupUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec({ email, password }: SignupParams) {
    await this.userRepository.create(password, email)
  }
}
