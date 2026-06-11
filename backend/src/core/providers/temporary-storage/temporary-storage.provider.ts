import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'

import { toMilliseconds } from '@core/helpers'

import { LoggerProvider } from '../logger/logger.provider'

const TEN_MINUTES = 10
const REDIS_UNCONNECTED_ERROR_MESSAGE = 'Erro ao tentar conectar no Redis.'

interface SetOptions {
  ttlInMinutes?: number
  key: string
  value: string
}

@Injectable()
export class TemporaryStorageProvider implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly logger: LoggerProvider,
  ) {}

  async onModuleInit() {
    const store = this.cacheManager.stores[0].store
    const client = await store.getClient()

    const response = await client.ping()
    if (response !== 'PONG') {
      this.logger.logInternalError({
        message: REDIS_UNCONNECTED_ERROR_MESSAGE,
        response,
      })
    }
  }

  async set({ ttlInMinutes = TEN_MINUTES, key, value }: SetOptions) {
    return await this.cacheManager.set(key, value, toMilliseconds({ minutes: ttlInMinutes }))
  }

  async get<T>(key: string) {
    return await this.cacheManager.get<T>(key)
  }

  async del(key: string) {
    return await this.cacheManager.del(key)
  }
}
