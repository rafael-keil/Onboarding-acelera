import { Inject, Injectable } from '@nestjs/common'
import { Connection, Model, Schema } from 'mongoose'

import { DATABASE_CONNECTION } from '@core/constants'

@Injectable()
export class DatabaseProvider {
  constructor(@Inject(DATABASE_CONNECTION) private readonly connection: Connection) {}

  getModel<T>(name: string, schema: Schema<T>): Model<T> {
    return this.connection.model<T>(name, schema)
  }
}
