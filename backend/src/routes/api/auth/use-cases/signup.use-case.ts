import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UserRepository } from '@core/repositories'

import { SignupParams } from '../types'

const SALT_OR_ROUNDS = 10

@Injectable()
export class SignupUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec({ email, password }: SignupParams) {
    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new ConflictException('Email já cadastrado')
    }

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS)

    await this.userRepository.create(hashedPassword, email)
  }
}
