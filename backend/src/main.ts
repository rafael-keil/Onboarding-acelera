import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { BackendModule } from './backend.module'
import { configureServer } from './config-server'

async function start() {
  const app = await NestFactory.create<NestExpressApplication>(BackendModule)
  configureServer(app)
  await app.listen(3001)
}

start()
