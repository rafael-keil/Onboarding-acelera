import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { ENV_JWT_SECRET } from '@core/constants'

import { AuthController } from './auth.controller'
import { LoginUseCase, SignupUseCase } from './use-cases'

@Module({
  imports: [
    JwtModule.register({
      secret: ENV_JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, SignupUseCase],
})
export class AuthModule {}
