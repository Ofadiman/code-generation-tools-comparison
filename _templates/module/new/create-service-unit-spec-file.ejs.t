---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.service.unit.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { NotFoundException } from '@nestjs/common'
import { createModelMock, execute, MockedModel } from '@test-utils'
import { MethodArgs } from '@types'
import { <%= h.changeCase.pascalCase(name) %>Service } from './<%= h.changeCase.paramCase(name) %>.service'
import { <%= h.changeCase.pascalCase(h.inflection.singularize(name)) %> } from './<%= h.changeCase.paramCase(h.inflection.singularize(name)) %>.schema'
import { createTest<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %> } from './<%= h.changeCase.paramCase(h.inflection.singularize(name)) %>.mocks'

let <%= h.changeCase.camelCase(name) %>Service: <%= h.changeCase.pascalCase(name) %>Service
let <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model: MockedModel

beforeEach(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    providers: [
      <%= h.changeCase.pascalCase(name) %>Service,
      {
        provide: getModelToken(<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>.name),
        useValue: createModelMock(),
      },
    ],
  }).compile()

  <%= h.changeCase.camelCase(name) %>Service = testingModule.get<<%= h.changeCase.pascalCase(name) %>Service>(<%= h.changeCase.pascalCase(name) %>Service)
  <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model = testingModule.get(getModelToken(<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>.name))
})

describe('<%= h.changeCase.pascalCase(name) %>Service', () => {
  describe('create', () => {
    const createArgs: MethodArgs<typeof <%= h.changeCase.pascalCase(name) %>Service, 'create'> = {}

    it('should create <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %>', async () => {
      const result = await execute(async () => {
        return <%= h.changeCase.camelCase(name) %>Service.create(createArgs)
      })

      expect(result.error).toBeNull()
      expect(<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model.create).toHaveBeenCalledWith({
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    })
  })

  describe('getById', () => {
    it('should throw error when <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %> is not found', async () => {
      <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model.findOne.mockResolvedValueOnce(null)

      const result = await execute(async () => {
        return <%= h.changeCase.camelCase(name) %>Service.getById({ <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Id: '62c0044efacef7bcb0ecea45' })
      })

      expect(result.error).toBeInstanceOf(NotFoundException)
      expect(<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model.findOne).toHaveBeenCalledWith({ _id: '62c0044efacef7bcb0ecea45' })
    })

    it('should return found <%= h.changeCase.lowerCase(h.changeCase.sentenceCase(h.inflection.singularize(name))) %>', async () => {
      const found<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %> = createTest<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>()
      <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model.findOne.mockResolvedValueOnce(found<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>)

      const result = await execute(async () => {
        return <%= h.changeCase.camelCase(name) %>Service.getById({ <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Id: found<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>._id.toHexString() })
      })

      expect(result.error).toBeNull()
      expect(result.data).toEqual(found<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>)
      expect(<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model.findOne).toHaveBeenCalledWith({
        _id: found<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>._id.toHexString(),
      })
    })
  })
})
