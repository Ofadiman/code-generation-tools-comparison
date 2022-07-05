import { prompt } from 'enquirer'
import { kebabCase } from 'lodash'
import { readdirSync } from 'fs'

const prompts: Parameters<typeof prompt>[0][] = [
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
    type: 'autocomplete',
    name: 'module',
    choices: (() => {
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
    })(),
    message: 'Pick a module name:',
  },
  {
    type: 'autocomplete',
    name: 'method',
    choices: ['Get', 'Post', 'Patch', 'Put', 'Delete'],
    message: 'Pick a method name:',
  },
  {
    type: 'input',
    name: 'path',
    message: 'Rest API path (kebab-case):',
  },
]

export default prompts
