import { Test, TestingModule } from '@nestjs/testing'
import { BackendController } from '@src/backend.controller'
import { configureServer } from '@src/config-server'
import { RoutesModule } from '@src/routes/routes.module'

import { MockCoreModule } from './core-mock.module'

const createTestApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [MockCoreModule, RoutesModule],
    controllers: [BackendController],
  }).compile()

  const app = moduleFixture.createNestApplication()
  configureServer(app)
  await app.init()

  return app
}

export { createTestApp }
