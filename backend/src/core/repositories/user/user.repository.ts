import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { DatabaseProvider } from '@core/providers'

import { User, UserSchema } from './schemas'

@Injectable()
export class UserRepository {
  private userModel: Model<User>

  constructor(private readonly dbp: DatabaseProvider) {
    this.userModel = this.dbp.getModel(User.name, UserSchema)
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec()
  }

  async create(password: string, email: string): Promise<User> {
    return await this.userModel.create({ password, email })
  }
}
