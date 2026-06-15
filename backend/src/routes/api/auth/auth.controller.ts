import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { LoginRequest, SignupRequest } from './requests'
import { LoginUseCase, SignupUseCase } from './use-cases'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Realiza o cadastro do usuário' })
  async signup(@Body() { email, password }: SignupRequest) {
    await this.signupUseCase.exec({ email, password })
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  async login(@Body() { email, password }: LoginRequest) {
    return await this.loginUseCase.exec({ email, password })
  }
}
