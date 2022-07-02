import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './user.schema'
import { Model } from 'mongoose'
import { createHash } from 'node:crypto'

@Injectable()
export class UsersService {
  public constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  public async register(args: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    const existingUser = await this.userModel.findOne({ email: args.email })
    if (existingUser) {
      throw new ConflictException(`Email ${args.email} is already in use.`)
    }

    const now = new Date().toISOString()

    return this.userModel.create({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      passwordHash: createHash('sha256').update(args.password).digest('hex'),
      createdAt: now,
      updatedAt: now,
    })
  }

  public async getById(args: { userId: string }) {
    const user = await this.userModel.findOne({ _id: args.userId })

    if (user === null) {
      throw new NotFoundException(`User with id ${args.userId} not found.`)
    }

    return user
  }

  public async changeEmail(args: { newEmail: string; userId: string }) {
    const userWithNewEmail = await this.userModel.findOne({ email: args.newEmail })

    if (userWithNewEmail) {
      throw new ConflictException(`Email ${args.newEmail} is already in use.`)
    }

    const user = await this.userModel.findOne({ _id: args.userId })

    if (!user) {
      throw new NotFoundException(`User with id ${args.userId} not found.`)
    }

    return this.userModel.findOneAndUpdate(
      { email: user.email },
      { email: args.newEmail, updatedAt: new Date().toISOString() },
    )
  }
}
