import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UserRepository } from '@core/repositories'

interface SignupParams {
  email: string
  password: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 6

@Injectable()
export class SignupUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  private validateEmail(email: string) {
    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestException('Email inválido')
    }
  }

  private validatePassword(password: string) {
    const hasMinLength = password.length >= PASSWORD_MIN_LENGTH
    const hasNumber = /\d/.test(password)

    if (!hasMinLength || !hasNumber) {
      throw new BadRequestException('Senha fraca')
    }
  }

  async exec({ email, password }: SignupParams) {
    this.validateEmail(email)
    this.validatePassword(password)

    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new ConflictException('Email já cadastrado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.userRepository.create(hashedPassword, email)
  }
}
