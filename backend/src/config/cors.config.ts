import { NestExpressApplication } from '@nestjs/platform-express'

export const configureCors = (app: NestExpressApplication) => {
  app.enableCors()
}
