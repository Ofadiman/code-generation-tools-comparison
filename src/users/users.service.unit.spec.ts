import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getModelToken } from '@nestjs/mongoose'
import { User } from './user.schema'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { createTestUser } from './user.mocks'
import { faker } from '@faker-js/faker'
import { createModelMock, execute, MockedModel } from '@test-utils'
import { MethodArgs } from '@types'

let usersService: UsersService
let userModel: MockedModel

beforeEach(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getModelToken(User.name),
        useValue: createModelMock(),
      },
    ],
  }).compile()

  usersService = testingModule.get<UsersService>(UsersService)
  userModel = testingModule.get(getModelToken(User.name))
})

describe('UsersService', () => {
  describe('register', () => {
    const registerArgs: MethodArgs<typeof UsersService, 'register'> = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: 'password',
    }

    it('should throw conflict exception when user with that email already exists', async () => {
      userModel.findOne.mockResolvedValueOnce(createModelMock())

      const result = await execute(async () => {
        return usersService.register(registerArgs)
      })

      expect(result.error).toBeInstanceOf(ConflictException)
      expect(userModel.findOne).toHaveBeenCalledWith({ email: registerArgs.email })
    })

    it('should create user', async () => {
      const createdUser = createTestUser()
      userModel.findOne.mockResolvedValueOnce(undefined)
      userModel.create.mockReturnValue(createdUser)

      const result = await execute(async () => {
        return usersService.register(registerArgs)
      })

      expect(userModel.findOne).toHaveBeenCalledWith({ email: registerArgs.email })
      expect(userModel.create).toHaveBeenCalledWith({
        firstName: registerArgs.firstName,
        lastName: registerArgs.lastName,
        email: registerArgs.email,
        passwordHash: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(result.error).toBeNull()
      expect(result.data).toEqual(createdUser)
    })
  })

  describe('getById', () => {
    it('should throw error when user is not found', async () => {
      userModel.findOne.mockResolvedValueOnce(null)

      const result = await execute(async () => {
        return usersService.getById({ userId: '62c0044efacef7bcb0ecea45' })
      })

      expect(result.error).toBeInstanceOf(NotFoundException)
      expect(userModel.findOne).toHaveBeenCalledWith({ _id: '62c0044efacef7bcb0ecea45' })
    })

    it('should return found user', async () => {
      const foundUser = createTestUser()
      userModel.findOne.mockResolvedValueOnce(foundUser)

      const result = await execute(async () => {
        return usersService.getById({ userId: '62c0044efacef7bcb0ecea45' })
      })

      expect(result.error).toBeNull()
      expect(result.data).toEqual(foundUser)
      expect(userModel.findOne).toHaveBeenCalledWith({ _id: '62c0044efacef7bcb0ecea45' })
    })
  })

  describe('changeEmail', () => {
    const user = createTestUser()
    const conflictingUser = createTestUser()
    const changeEmailArgs: MethodArgs<typeof UsersService, 'changeEmail'> = {
      userId: user._id.toHexString(),
      newEmail: faker.internet.email(),
    }
    const conflictingChangeEmailArgs: MethodArgs<typeof UsersService, 'changeEmail'> = {
      userId: conflictingUser._id.toHexString(),
      newEmail: conflictingUser.email,
    }

    it('should throw error when new email is already in use by another user', async () => {
      userModel.findOne.mockResolvedValueOnce(conflictingUser)

      const result = await execute(async () => {
        return usersService.changeEmail(conflictingChangeEmailArgs)
      })

      expect(result.error).toBeInstanceOf(ConflictException)
      expect(userModel.findOne).toHaveBeenCalledWith({ email: conflictingChangeEmailArgs.newEmail })
    })

    it('should throw error when user that wants to change email is not found', async () => {
      userModel.findOne.mockResolvedValueOnce(undefined)
      userModel.findOne.mockResolvedValueOnce(undefined)

      const result = await execute(async () => {
        return usersService.changeEmail(changeEmailArgs)
      })

      expect(result.error).toBeInstanceOf(NotFoundException)
      expect(userModel.findOne).toHaveBeenCalledWith({ email: changeEmailArgs.newEmail })
      expect(userModel.findOne).toHaveBeenCalledWith({ _id: changeEmailArgs.userId })
    })

    it('should change email', async () => {
      userModel.findOne.mockResolvedValueOnce(undefined)
      userModel.findOne.mockResolvedValueOnce(user)

      const result = await execute(async () => {
        return usersService.changeEmail(changeEmailArgs)
      })

      expect(result.error).toBeNull()
      expect(userModel.findOne).toHaveBeenCalledWith({ email: changeEmailArgs.newEmail })
      expect(userModel.findOne).toHaveBeenCalledWith({ _id: changeEmailArgs.userId })
      expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
        { email: user.email },
        { email: changeEmailArgs.newEmail, updatedAt: expect.any(String) },
      )
    })
  })
})
