---
to: src/app.module.ts
inject: true
after: "imports: \\["
---
    <%= h.changeCase.pascalCase(name) %>Module,-%>
