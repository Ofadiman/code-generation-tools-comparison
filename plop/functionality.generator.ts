import { NodePlopAPI } from 'plop'
import { kebabCase } from 'lodash'

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
      choices: [
        {
          name: 'users',
          value: 'users',
        },
      ],
    },
    {
      type: 'list',
      name: 'method',
      choices: [
        { name: 'get', value: 'get' },
        { name: 'post', value: 'post' },
        { name: 'patch', value: 'patch' },
        { name: 'put', value: 'put' },
        { name: 'delete', value: 'delete' },
      ],
    },
    {
      type: 'input',
      name: 'path',
      message: 'Rest API path (kebab-case)',
      validate: (value: string) => {
        const kebabCaseValue = kebabCase(value)

        const isKebabCase = kebabCaseValue === value
        if (!isKebabCase) {
          return `Functionality name must be in kebab-case.`
        }

        return true
      },
    },
  ],
  actions: [
    // Create a file containing the DTO.
    {
      type: 'add',
      path: 'src/{{ module }}/dto/users.{{ name }}.dto.ts',
      template: `export class {{ pascalCase module }}Controller{{ pascalCase name }}RequestBodyDto {}

export class {{ pascalCase module}}Controller{{ pascalCase name }}ResponseBodyDto {}
`,
    },
    // Add DTO imports in the controller.
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.ts',
      pattern: /from.+/u,
      template: `import { {{ pascalCase module }}Controller{{ pascalCase name }}RequestBodyDto, {{ pascalCase module }}Controller{{ pascalCase name }}ResponseBodyDto } from './dto/{{ module }}.{{ name }}.dto'`,
    },
    // Add a new method in the controller.
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.ts',
      template: `
  @{{ pascalCase method }}('{{ path }}')
  public async {{ camelCase name }}(@Body() body: {{ pascalCase module }}Controller{{ pascalCase name }}RequestBodyDto): Promise<{{ pascalCase module }}Controller{{ pascalCase name }}ResponseBodyDto> {
    return this.{{ camelCase module }}Service.{{ camelCase name }}(body)
  }`,
      pattern: /\{\}/u,
    },
    // Add a new method in the service.
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.service.ts',
      template: `
  public async {{ camelCase name }}(args: {}) {
    return {}
  }`,
      pattern: /\{\}/u,
    },
    // Add a `describe` block at the very beginning of the main `describe` block present in the service test file.
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.service.unit.spec.ts',
      pattern: /describe.+/u,
      template: `  describe('{{ camelCase name }}', () => {
    it('should handle execution', async () => {
      const {{ camelCase name }}Args: MethodArgs<typeof {{ pascalCase module }}Service, '{{ camelCase name }}'> = {}

      const result = await execute(async () => {
        return {{ module }}Service.{{ camelCase name }}({{ camelCase name }}Args)
      })

      expect(result.data).toMatchSnapshot()
    })
  })
`,
    },
    // Add a `describe` block at the very beginning of the main `describe` block present in the controller test file.
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.integration.spec.ts',
      pattern: /describe.+/u,
      template: `  describe('{{ sentenceCase ( lowerCase name ) }}', () => {
    it('should handle request', async () => {
      const body: {{ pascalCase module }}Controller{{ pascalCase name }}RequestBodyDto = {}

      const response = await supertest(nestApplication.getHttpServer())
        .{{ lowerCase method }}('/{{ module }}/{{ path }}')
        .send(body)

      expect(response.status).toBe(HttpStatus.OK)
    })
  })
`,
    },
    // Add an import statement that adds the DTO at the very end of all imports present in the controller test.
    {
      type: 'append',
      path: 'src/{{ module }}/{{ module }}.controller.integration.spec.ts',
      pattern: /from.+/u,
      template: `import { {{ pascalCase module }}Controller{{ pascalCase name }}RequestBodyDto } from './dto/{{ module }}.{{ name }}.dto'`,
    },
  ],
}
