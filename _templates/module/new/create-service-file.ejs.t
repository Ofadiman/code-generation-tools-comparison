---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.service.ts
---
import { Injectable, NotFoundException } from '@nestjs/common'
import { <%= h.changeCase.pascalCase(h.inflection.singularize(name)) %> } from './<%= h.changeCase.paramCase(h.inflection.singularize(name)) %>.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class <%= h.changeCase.pascalCase(name) %>Service {
  constructor(@InjectModel(<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>.name) private readonly <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model: Model<<%= h.changeCase.pascalCase(h.inflection.singularize(name)) %>>) {}

  async create(args: {}) {
    const now = new Date().toISOString()

    return this.<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model.create({
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  }

  async getById(args: { <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Id: string }) {
    const <%= h.changeCase.camelCase(h.inflection.singularize(name)) %> = await this.<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Model.findOne({ _id: args.<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Id })

    if (!<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>) {
      throw new NotFoundException(`<%= h.inflection.capitalize(h.changeCase.sentenceCase(h.inflection.singularize(name))) %> with id ${args.<%= h.changeCase.camelCase(h.inflection.singularize(name)) %>Id} not found.`)
    }

    return <%= h.changeCase.camelCase(h.inflection.singularize(name)) %>
  }
}
