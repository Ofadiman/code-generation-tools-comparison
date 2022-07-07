---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.module.ts
---
import { Module } from '@nestjs/common'
import { <%= h.changeCase.pascalCase(name) %>Controller } from './<%= h.changeCase.paramCase(name) %>.controller'
import { <%= h.changeCase.pascalCase(name) %>Service } from './<%= h.changeCase.paramCase(name) %>.service'
import { MongooseModule } from '@nestjs/mongoose'
import { <%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>, <%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>Schema } from './<%= h.inflection.singularize(h.changeCase.paramCase(name)) %>.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: <%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>.name, schema: <%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>Schema }])],
  controllers: [<%= h.changeCase.pascalCase(name) %>Controller],
  providers: [<%= h.changeCase.pascalCase(name) %>Service],
})
export class <%= h.changeCase.pascalCase(name) %>Module {}
