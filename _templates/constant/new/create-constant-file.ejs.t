---
to: src/@constants/<%= name %>.constants.ts
---
export const <%= h.changeCase.upper(h.changeCase.snake(name)) %>_CONSTANTS = {} as const
