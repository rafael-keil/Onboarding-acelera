import { Global, Module } from '@nestjs/common'

import { DatabaseProvider, LoggerProvider } from '@core/providers'
import { RepositoriesModule } from '@core/repositories/repositories.module'

import { DatabaseMockProvider } from './database-provider.mock'
import { LoggerMock } from './logger.mock'

const databaseProvider = {
  provide: DatabaseProvider,
  useValue: DatabaseMockProvider,
}

@Module({
  imports: [],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class MockDatabaseModule {}

const loggerProvider = {
  provide: LoggerProvider,
  useValue: LoggerMock,
}

@Module({
  imports: [MockDatabaseModule],
  exports: [MockDatabaseModule],
})
export class MockProvidersModule {}

@Global()
@Module({
  imports: [MockProvidersModule, RepositoriesModule],
  providers: [loggerProvider],
  exports: [MockProvidersModule, RepositoriesModule],
})
export class MockCoreModule {}
