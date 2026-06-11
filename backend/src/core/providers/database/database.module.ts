import { Module } from '@nestjs/common'
import * as mongoose from 'mongoose'

import { DATABASE_CONNECTION, ENV_MONGO_URL } from '@core/constants'

import { DatabaseProvider } from './database.provider'

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (): Promise<typeof mongoose> => mongoose.connect(ENV_MONGO_URL),
    },
    DatabaseProvider,
  ],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
