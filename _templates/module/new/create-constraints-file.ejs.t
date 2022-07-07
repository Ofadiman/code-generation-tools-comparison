---
to: src/<%= h.changeCase.paramCase(name) %>/<%= h.inflection.singularize(h.changeCase.paramCase(name)) %>.constraints.ts
---
export const <%= h.inflection.singularize(h.changeCase.constantCase(name)) %>_CONSTRAINTS = {}
