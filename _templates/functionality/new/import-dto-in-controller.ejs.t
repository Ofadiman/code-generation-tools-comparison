---
to: src/<%= module %>/<%= module %>.controller.ts
inject: true
prepend: true
---
import { UsersController<%= h.changeCase.pascalCase(name) %>RequestBodyDto, UsersController<%= h.changeCase.pascalCase(name) %>ResponseBodyDto } from './dto/<%= module %>.<%= name %>.dto'-%>
