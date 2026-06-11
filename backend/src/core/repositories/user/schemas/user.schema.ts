import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { COLLECTION_NAME } from '@core/constants'

@Schema({ collection: COLLECTION_NAME.USERS, timestamps: { createdAt: true, updatedAt: true } })
export class User {
  _id: Types.ObjectId

  @Prop()
  email: string

  @Prop({ type: String })
  password: string
}

export type UserDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User)
