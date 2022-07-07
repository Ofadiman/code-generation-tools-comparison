---
to: src/<%= h.changeCase.paramCase(name) %>/dto/<%= h.changeCase.paramCase(name) %>.create.dto.ts
---
import {} from 'class-validator'
import { <%= h.changeCase.constantCase(h.inflection.singularize(name)) %>_CONSTRAINTS } from '../<%= h.changeCase.paramCase(h.inflection.singularize(name)) %>.constraints'

export class <%= h.changeCase.pascalCase(name) %>ControllerCreateRequestBodyDto {}

export class <%= h.changeCase.pascalCase(name) %>ControllerCreateResponseBodyDto {}
