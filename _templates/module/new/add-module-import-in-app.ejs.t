---
to: src/app.module.ts
inject: true
prepend: true
---
import { <%= h.changeCase.pascalCase(name) %>Module } from './<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.module'-%>
