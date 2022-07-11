import { kebabCase } from 'lodash'
import { NodePlopAPI, CustomActionFunction } from 'plop'

const customActionFunction: CustomActionFunction = async (_answers, _config, _plopfileApi) => {
  return 'Custom function executed successfully.'
}

export const constantGenerator: Parameters<NodePlopAPI['setGenerator']>[1] = {
  description: 'Generate constant value available in the whole application.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Constant name (kebab-case)',
      validate: (value: string) => {
        const kebabCaseValue = kebabCase(value)

        const isKebabCase = kebabCaseValue === value
        if (!isKebabCase) {
          return `Constant name must be in kebab-case.`
        }

        return true
      },
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/@constants/{{ name }}.constants.ts',
      template: 'export const {{ constantCase name }} = {}\n',
    },
    {
      type: 'append',
      path: 'src/@constants/index.ts',
      template: `export * from './{{ name }}.constants'\n`,
      separator: '',
    },
    customActionFunction,
  ],
}
