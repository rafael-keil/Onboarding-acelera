import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { ACTIVE_ENV, ENV_ACTIVE_ENV } from '@core/constants'

type configureSwaggerParams = {
  app: INestApplication
  title: string
  version: string
}

export const configureSwagger = async ({ app, title, version }: configureSwaggerParams) => {
  if (ENV_ACTIVE_ENV === ACTIVE_ENV.PROD) return

  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion(version)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setExternalDoc('swagger.json', '/docs/swagger.json')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.getHttpAdapter().get('/docs/swagger.json', (_req: Request, res: Response) => {
    res.send(document)
  })
}
