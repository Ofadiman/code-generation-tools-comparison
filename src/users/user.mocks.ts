import { UserDocumentFields } from './user.schema'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { createHash } from 'node:crypto'
import { merge } from 'lodash'
import { TestDocumentFactory, TestDocumentFields } from '@test-utils'

export const createTestUser: TestDocumentFactory<UserDocumentFields> = (fields) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email(firstName, lastName)
  const passwordHash = createHash('sha256').update('password').digest('hex')

  const defaultUserDocument: Required<TestDocumentFields<UserDocumentFields>> = {
    _id: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
    firstName,
    lastName,
    email,
    passwordHash,
    createdAt: new Date('2022-06-01T08:00:00.000Z'),
    updatedAt: new Date('2022-06-01T08:00:00.000Z'),
  }

  return merge(defaultUserDocument, fields)
}
