---
to: src/<%= module %>/dto/<%= module %>.<%= name %>.dto.ts
---
export class UsersController<%= h.changeCase.pascalCase(name) %>RequestBodyDto {}

export class UsersController<%= h.changeCase.pascalCase(name) %>ResponseBodyDto {}
