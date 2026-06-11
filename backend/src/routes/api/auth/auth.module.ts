import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { SignupUseCase } from './use-cases'

@Module({
  controllers: [AuthController],
  providers: [SignupUseCase],
})
export class AuthModule {}
