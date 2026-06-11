import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { SignupRequest } from './requests'
import { SignupUseCase } from './use-cases'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly signupUseCase: SignupUseCase) {}

  @Post('signup')
  @ApiOperation({ summary: 'Realiza o cadastro do usuário' })
  async signup(@Body() { email, password }: SignupRequest) {
    await this.signupUseCase.exec({ email, password })
  }
}
