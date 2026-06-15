import { ApiProperty } from '@nestjs/swagger'

import { ToNormalizer } from '@core/transformers'
import { IsEmail, IsNotEmpty, IsString } from '@core/validators'

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'senha123' })
  password: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ToNormalizer()
  @ApiProperty({ example: 'fulaninho@bbc.com.br' })
  email: string
}
