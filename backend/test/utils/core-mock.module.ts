import { Global, Module } from '@nestjs/common'

import { DatabaseProvider, LoggerProvider, TemporaryStorageProvider } from '@core/providers'
import { RepositoriesModule } from '@core/repositories/repositories.module'

import { DatabaseMockProvider } from './database-provider.mock'
import { LoggerMock } from './logger.mock'
import { TemporaryStorageMock } from './temporary-storage.mock'

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

const temporaryStorageProvider = {
  provide: TemporaryStorageProvider,
  useValue: TemporaryStorageMock,
}

@Module({
  imports: [MockDatabaseModule],
  exports: [MockDatabaseModule],
})
export class MockProvidersModule {}

@Global()
@Module({
  imports: [MockProvidersModule, RepositoriesModule],
  providers: [loggerProvider, temporaryStorageProvider],
  exports: [MockProvidersModule, RepositoriesModule, temporaryStorageProvider],
})
export class MockCoreModule {}
