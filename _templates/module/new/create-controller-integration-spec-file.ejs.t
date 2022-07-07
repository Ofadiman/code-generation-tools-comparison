---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.controller.integration.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing'
import { <%= h.changeCase.pascalCase(name) %>Controller } from './<%= h.changeCase.paramCase(name) %>.controller'
import { AppModule } from '../app.module'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Model } from 'mongoose'
import supertest from 'supertest'
import { <%= h.inflection.singularize(h.changeCase.pascalCase(name)) %> } from './<%= h.inflection.singularize(name) %>.schema'
import { getModelToken } from '@nestjs/mongoose'
import { <%= h.changeCase.pascalCase(name) %>ControllerCreateRequestBodyDto } from './dto/<%= h.changeCase.paramCase(name) %>.create.dto'
import { createTest<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %> } from './<%= h.inflection.singularize(name) %>.mocks'

let nestApplication: INestApplication
let <%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Model: Model<<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>>

const first<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %> = createTest<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>()
const second<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %> = createTest<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>()

beforeAll(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  nestApplication = testingModule.createNestApplication()
  await nestApplication.init()
  <%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Model = nestApplication.get(getModelToken(<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>.name))
})

beforeEach(async () => {
  await <%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Model.create(first<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>)
  await <%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Model.create(second<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>)
})

afterEach(async () => {
  await <%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Model.deleteMany({})
})

afterAll(async () => {
  await nestApplication.close()
})

describe('<%= h.changeCase.pascalCase(name) %>Controller', () => {
  describe('create <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %>', () => {
    it('should create <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %>', async () => {
      const body: <%= h.changeCase.pascalCase(name) %>ControllerCreateRequestBodyDto = {}

      const response = await supertest(nestApplication.getHttpServer()).post('/<%= h.changeCase.paramCase(name) %>').send(body)

      expect(response.body).toMatchSnapshot({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(response.status).toBe(HttpStatus.CREATED)
    })
  })

  describe('get <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %> by id', () => {
    it('should throw error when <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %> does not exist', async () => {
      const response = await supertest(nestApplication.getHttpServer())
        .get(`/<%= h.changeCase.paramCase(name) %>/62c3261b4bc318d862a90a71`)
        .send()

      expect(response.body).toMatchSnapshot()
      expect(response.status).toBe(HttpStatus.NOT_FOUND)
    })

    it('should get <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %> by id', async () => {
      const response = await supertest(nestApplication.getHttpServer())
        .get(`/<%= h.changeCase.paramCase(name) %>/${first<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>._id}`)
        .send()

      expect(response.body).toMatchSnapshot({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(response.status).toBe(HttpStatus.OK)
    })
  })
})
