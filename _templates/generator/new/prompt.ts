import { prompt } from 'enquirer'
import { kebabCase } from 'lodash'

const prompts: Parameters<typeof prompt>[0][] = [
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
]

export default prompts
