import { ValidationPipe } from '@nestjs/common'

export const configureValidationPipe = app => {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
}
