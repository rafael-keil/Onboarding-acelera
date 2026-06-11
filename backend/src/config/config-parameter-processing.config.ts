import { NestExpressApplication } from '@nestjs/platform-express'

export const configureParameterProcessing = (app: NestExpressApplication) => {
  app.set('query parser', 'extended')
}
