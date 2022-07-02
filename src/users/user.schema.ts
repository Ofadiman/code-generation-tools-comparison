import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { USER_CONSTRAINTS } from './user.constraints'

export type UserDocument = User & Document

export type UserDocumentFields = {
  _id: string

  firstName: string
  lastName: string
  email: string
  passwordHash: string

  createdAt: Date
  updatedAt: Date
}

@Schema({ collection: 'users', versionKey: false })
export class User implements Omit<UserDocumentFields, '_id'> {
  @Prop({
    required: true,
    minLength: USER_CONSTRAINTS.FIRST_NAME.MIN_LENGTH,
    maxlength: USER_CONSTRAINTS.FIRST_NAME.MAX_LENGTH,
    type: String,
  })
  public firstName: string

  @Prop({
    required: true,
    minlength: USER_CONSTRAINTS.LAST_NAME.MIN_LENGTH,
    maxlength: USER_CONSTRAINTS.LAST_NAME.MAX_LENGTH,
    type: String,
  })
  public lastName: string

  @Prop({
    required: true,
    unique: true,
    minlength: USER_CONSTRAINTS.EMAIL.MIN_LENGTH,
    maxlength: USER_CONSTRAINTS.EMAIL.MAX_LENGTH,
    type: String,
  })
  public email: string

  @Prop({ required: true, type: String })
  public passwordHash: string

  @Prop({ required: true, type: Date })
  public createdAt: Date

  @Prop({ required: true, type: Date })
  public updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
