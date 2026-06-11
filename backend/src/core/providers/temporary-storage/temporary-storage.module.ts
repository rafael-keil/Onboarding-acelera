import KeyvRedis from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'

import { ENV_REDIS_URL } from '@core/constants'

import { TemporaryStorageProvider } from './temporary-storage.provider'

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        stores: [new KeyvRedis(ENV_REDIS_URL)],
      }),
    }),
  ],
  providers: [TemporaryStorageProvider],
  exports: [TemporaryStorageProvider],
})
export class TemporaryStorageModule {}
