import { ApiProperty } from '@nestjs/swagger'

import { ToNormalizer } from '@core/transformers'
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from '@core/validators'

export class SignupRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/\d/)
  @ApiProperty({ example: 'senha123' })
  password: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ToNormalizer()
  @ApiProperty({ example: 'fulaninho@bbc.com.br' })
  email: string
}
