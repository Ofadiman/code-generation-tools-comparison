---
to: src/<%= h.changeCase.paramCase(name) %>/dto/<%= h.changeCase.paramCase(name) %>.get-by-id.dto.ts
---
import { IsMongoId } from 'class-validator'

export class <%= h.changeCase.pascalCase(name) %>ControllerGetByIdRequestParamDto {
  @IsMongoId()
  public readonly <%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Id: string
}

export class <%= h.changeCase.pascalCase(name) %>ControllerGetByIdResponseBodyDto {}
