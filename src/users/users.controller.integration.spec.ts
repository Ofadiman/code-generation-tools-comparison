import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { AppModule } from '../app.module'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Model } from 'mongoose'
import supertest from 'supertest'
import { User } from './user.schema'
import { getModelToken } from '@nestjs/mongoose'
import { UsersControllerChangeEmailRequestBodyDto } from './dto/users.change-email.dto'
import { createTestUser } from './user.mocks'
import { UsersControllerRegisterRequestBodyDto } from './dto/users.register.dto'

let nestApplication: INestApplication
let userModel: Model<User>

const firstUser = createTestUser()
const secondUser = createTestUser()

beforeAll(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  nestApplication = testingModule.createNestApplication()
  await nestApplication.init()
  userModel = nestApplication.get(getModelToken(User.name))
})

beforeEach(async () => {
  await userModel.create(firstUser)
  await userModel.create(secondUser)
})

afterEach(async () => {
  await userModel.deleteMany({})
})

afterAll(async () => {
  await nestApplication.close()
})

describe('UsersController', () => {
  describe('register user', () => {
    it('should throw conflict error when user with send email already exists', async () => {
      const body: UsersControllerRegisterRequestBodyDto = {
        email: firstUser.email,
        firstName: firstUser.firstName,
        lastName: firstUser.lastName,
        password: 'password',
      }

      const response = await supertest(nestApplication.getHttpServer())
        .post('/users/register')
        .send(body)

      expect(response.body).toMatchSnapshot()
      expect(response.status).toBe(HttpStatus.CONFLICT)
    })

    it('should create user', async () => {
      const body: UsersControllerRegisterRequestBodyDto = {
        email: 'szymon.jaworski@gmail.com',
        firstName: 'Szymon',
        lastName: 'Jaworski',
        password: 'password',
      }

      const response = await supertest(nestApplication.getHttpServer())
        .post('/users/register')
        .send(body)

      expect(response.body).toMatchSnapshot({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(response.status).toBe(HttpStatus.CREATED)
    })
  })

  describe('get user by id', () => {
    it('should throw error when user does not exist', async () => {
      const response = await supertest(nestApplication.getHttpServer())
        .get('/users/62c0516f8af7997e327bfa91')
        .send()

      expect(response.body).toMatchSnapshot()
      expect(response.status).toBe(HttpStatus.NOT_FOUND)
    })

    it('should get user by id', async () => {
      const response = await supertest(nestApplication.getHttpServer())
        .get(`/users/${firstUser._id}`)
        .send()

      expect(response.body).toMatchSnapshot({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(response.status).toBe(HttpStatus.OK)
    })
  })

  describe('change email', () => {
    it('should throw an error when new email already exist in the database', async () => {
      const body: UsersControllerChangeEmailRequestBodyDto = {
        newEmail: secondUser.email,
      }

      const response = await supertest(nestApplication.getHttpServer())
        .patch(`/users/${firstUser._id}/email`)
        .send(body)

      expect(response.body).toMatchSnapshot()
      expect(response.status).toBe(HttpStatus.CONFLICT)
    })

    it('should throw error when user does not exist', async () => {
      const body: UsersControllerChangeEmailRequestBodyDto = {
        newEmail: 'new.email@gmail.com',
      }

      const response = await supertest(nestApplication.getHttpServer())
        .patch(`/users/62c0521452e407761f19f258/email`)
        .send(body)

      expect(response.body).toMatchSnapshot()
      expect(response.status).toBe(HttpStatus.NOT_FOUND)
    })

    it('should change email', async () => {
      const body: UsersControllerChangeEmailRequestBodyDto = {
        newEmail: 'success@gmail.com',
      }

      const response = await supertest(nestApplication.getHttpServer())
        .patch(`/users/${firstUser._id}/email`)
        .send(body)

      expect(response.body).toMatchSnapshot({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(response.status).toBe(HttpStatus.OK)
    })
  })
})
