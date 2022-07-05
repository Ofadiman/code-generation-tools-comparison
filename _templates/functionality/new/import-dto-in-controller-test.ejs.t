---
to: src/<%= module %>/<%= module %>.controller.integration.spec.ts
inject: true
prepend: true
---
import { UsersController<%= h.changeCase.pascalCase(name) %>RequestBodyDto } from './dto/<%= module %>.<%= name %>.dto'-%>
