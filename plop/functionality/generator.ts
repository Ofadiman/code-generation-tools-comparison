import { NodePlopAPI } from 'plop'
import { kebabCase } from 'lodash'
import { readdirSync } from 'fs'

export const functionalityGenerator: Parameters<NodePlopAPI['setGenerator']>[1] = {
  description: 'Generate a new functionality.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Functionality name (kebab-case)',
      validate: (value: string) => {
        const kebabCaseValue = kebabCase(value)

        const isKebabCase = kebabCaseValue === value
        if (!isKebabCase) {
          return `Functionality name must be in kebab-case.`
        }

        return true
      },
    },
    {
      type: 'list',
      name: 'module',
      choices: () => {
        const srcContent = readdirSync('./src', { withFileTypes: true })
        const moduleDirectories = srcContent
          .filter((file) => {
            return file.isDirectory()
          })
          .filter((file) => {
            return !file.name.startsWith('@')
          })
          .map((directory) => directory.name)

        return moduleDirectories
      },
    },
    {
      type: 'list',
      name: 'method',
      choices: ['Get', 'Post', 'Patch', 'Put', 'Delete'],
    },
    {
      type: 'input',
      name: 'path',
      message: 'Rest API path (kebab-case)',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/{{ module }}/dto/users.{{ name }}.dto.ts',
      template: require('./templates/dto.template').default,
    },
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.ts',
      template: require('./templates/append-dto-import.template.ts').default,
      pattern: /from.+/u,
    },
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.ts',
      template: require('./templates/append-method-to-controller.template').default,
      pattern: /\{\}/u,
    },
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.service.ts',
      template: require('./templates/append-method-to-service.template').default,
      pattern: /\{\}/u,
    },
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.service.unit.spec.ts',
      template: require('./templates/append-describe-in-service-test.template').default,
      pattern: /describe.+/u,
    },
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.integration.spec.ts',
      template: require('./templates/append-describe-in-controller-test.template').default,
      pattern: /describe.+/u,
    },
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.integration.spec.ts',
      template: require('./templates/append-dto-import-in-controller-test.template').default,
      pattern: /from.+/u,
    },
  ],
}
