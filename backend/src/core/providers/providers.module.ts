import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'
import { TemporaryStorageModule } from './temporary-storage/temporary-storage.module'

@Module({
  imports: [DatabaseModule, LoggerModule, TemporaryStorageModule],
  exports: [DatabaseModule, LoggerModule, TemporaryStorageModule],
})
export class ProvidersModule {}
