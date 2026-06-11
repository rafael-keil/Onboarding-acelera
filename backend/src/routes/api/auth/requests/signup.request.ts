import { ApiProperty } from '@nestjs/swagger'

import { IsNotEmpty, IsString } from '@core/validators'

export class SignupRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'senha secreta' })
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'fulaninho@bbc.com.br' })
  email: string
}
