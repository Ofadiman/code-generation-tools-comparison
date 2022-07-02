import { createMock } from './create-mock'

export type MockedModel = {
  create: jest.Mock
  findOne: jest.Mock
  findOneAndUpdate: jest.Mock
}

export const createModelMock = (): MockedModel => {
  return {
    create: createMock('create'),
    findOne: createMock('findOne'),
    findOneAndUpdate: createMock('findOneAndUpdate'),
  }
}
