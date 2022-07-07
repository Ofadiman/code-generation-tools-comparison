---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.inflection.singularize(h.changeCase.paramCase(name)) %>.mocks.ts
---
import { <%= h.inflection.singularize(h.changeCase.pascalCase(name))%>DocumentFields } from './<%= h.inflection.singularize(h.changeCase.paramCase(name))%>.schema'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { merge } from 'lodash'
import { TestDocumentFactory, TestDocumentFields } from '@test-utils'

export const createTest<%= h.inflection.singularize(h.changeCase.pascalCase(name))%>: TestDocumentFactory<<%= h.inflection.singularize(h.changeCase.pascalCase(name))%>DocumentFields> = (fields) => {
  const default<%= h.inflection.singularize(h.changeCase.pascalCase(name))%>: Required<TestDocumentFields<<%= h.inflection.singularize(h.changeCase.pascalCase(name))%>DocumentFields>> = {
    _id: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
    createdAt: new Date('2022-06-01T08:00:00.000Z'),
    updatedAt: new Date('2022-06-01T08:00:00.000Z'),
  }

  return merge(default<%= h.inflection.singularize(h.changeCase.pascalCase(name))%>, fields)
}
