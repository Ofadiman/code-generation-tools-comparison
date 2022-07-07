---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.controller.ts
---
import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { <%= h.changeCase.pascalCase(name) %>Service } from './<%= h.changeCase.paramCase(name) %>.service'
import { <%= h.changeCase.pascalCase(name) %>ControllerCreateRequestBodyDto, <%= h.changeCase.pascalCase(name) %>ControllerCreateResponseBodyDto } from './dto/<%= h.changeCase.paramCase(name) %>.create.dto'
import { <%= h.changeCase.pascalCase(name) %>ControllerGetByIdRequestParamDto, <%= h.changeCase.pascalCase(name) %>ControllerGetByIdResponseBodyDto } from './dto/<%= h.changeCase.paramCase(name) %>.get-by-id.dto'

@Controller('<%= h.changeCase.paramCase(name) %>')
export class <%= h.changeCase.pascalCase(name) %>Controller {
  constructor(private readonly <%= h.changeCase.pascalCase(name) %>Service: <%= h.changeCase.pascalCase(name) %>Service) {}

  @Post('')
  create(@Body() body: <%= h.changeCase.pascalCase(name) %>ControllerCreateRequestBodyDto): Promise<<%= h.changeCase.pascalCase(name) %>ControllerCreateResponseBodyDto> {
    return this.<%= h.changeCase.pascalCase(name) %>Service.create({})
  }

  @Get(':<%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Id')
  getById(@Param() param: <%= h.changeCase.pascalCase(name) %>ControllerGetByIdRequestParamDto): Promise<<%= h.changeCase.pascalCase(name) %>ControllerGetByIdResponseBodyDto> {
    return this.<%= h.changeCase.pascalCase(name) %>Service.getById({ <%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Id: param.<%= h.inflection.singularize(h.changeCase.camelCase(name)) %>Id })
  }
}
