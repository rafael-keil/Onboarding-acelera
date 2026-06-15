import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { TemporaryStorageProvider } from '@core/providers'
import { UserRepository } from '@core/repositories'

import { LoginParams, LoginResult } from '../types'

const TOKEN_TTL_IN_MINUTES = 60

const buildAuthRedisKey = (userId: string, token: string) => `auth:${userId}:${token}`

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly temporaryStorageProvider: TemporaryStorageProvider,
  ) {}

  async exec({ email, password }: LoginParams): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta')
    }

    const userId = user._id.toString()
    const token = await this.jwtService.signAsync({ userId })

    await this.temporaryStorageProvider.set({
      key: buildAuthRedisKey(userId, token),
      value: token,
      ttlInMinutes: TOKEN_TTL_IN_MINUTES,
    })

    return { token }
  }
}
