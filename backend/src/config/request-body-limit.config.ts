import { INestApplication } from '@nestjs/common'
import { json } from 'express'

export const configureRequestBodyLimit = (app: INestApplication) => {
  app.use('/v1/onboarding/documents', json({ limit: '1.5mb' }))
  app.use(json({ limit: '100kb' }))
}
