import { kebabCase } from 'lodash'
import { NodePlopAPI } from 'plop'

export const functionGenerator: Parameters<NodePlopAPI['setGenerator']>[1] = {
  description: 'Generate a function available in the whole application.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Function name (kebab-case)',
      validate: (value: string) => {
        const kebabCaseValue = kebabCase(value)

        const isKebabCase = kebabCaseValue === value
        if (!isKebabCase) {
          return `Function name must be in kebab-case.`
        }

        return true
      },
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/@functions/{{ name }}/{{ name }}.ts',
      template: `export type {{ pascalCase name }}Args = {}

export type {{ pascalCase name }}Result = {}

export const {{ camelCase name }} = (args: {{ pascalCase name }}Args): {{ pascalCase name }}Result => {
  return {}
}
`,
    },
    {
      type: 'add',
      path: 'src/@functions/{{ name }}/{{ name }}.unit.spec.ts',
      template: `import { {{ camelCase name }} } from './{{ kebabCase name }}'

describe('{{ camelCase name }} function', () => {
  it('should be defined', () => {
    expect({{ camelCase name }}).toBeDefined()
  })
})
`,
    },
    {
      type: 'append',
      path: 'src/@functions/index.ts',
      template: `export * from './{{ name }}/{{ name }}'\n`,
      separator: '',
    },
  ],
}
