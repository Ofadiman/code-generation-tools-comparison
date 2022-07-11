---
to: src/@constants/<%= name %>.constants.ts
sh: "echo \"Executing custom shell script.\" > test.txt"
---
export const <%= h.changeCase.upper(h.changeCase.snake(name)) %>_CONSTANTS = {} as const
