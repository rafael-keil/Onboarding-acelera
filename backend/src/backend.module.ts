import { Module } from '@nestjs/common'

import { CoreModule } from '@core'

import { BackendController } from './backend.controller'
import { RoutesModule } from './routes/routes.module'

@Module({
  imports: [CoreModule, RoutesModule],
  controllers: [BackendController],
})
export class BackendModule {}
