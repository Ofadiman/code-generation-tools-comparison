---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.inflection.singularize(h.changeCase.paramCase(name)) %>.schema.ts
---
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { <%= h.inflection.singularize(h.changeCase.constantCase(name)) %>_CONSTRAINTS } from './<%= h.inflection.singularize(name) %>.constraints'

export type <%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>Document = <%= h.inflection.singularize(h.changeCase.pascalCase(name)) %> & Document

export type <%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>DocumentFields = {
  _id: string

  createdAt: Date
  updatedAt: Date
}

@Schema({ collection: '<%= h.changeCase.snakeCase(name) %>', versionKey: false })
export class <%= h.inflection.singularize(h.changeCase.pascalCase(name)) %> implements Omit<<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>DocumentFields, '_id'> {
  @Prop({ required: true, type: Date })
  public createdAt: Date

  @Prop({ required: true, type: Date })
  public updatedAt: Date
}

export const <%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>Schema = SchemaFactory.createForClass(<%= h.inflection.singularize(h.changeCase.pascalCase(name)) %>)
