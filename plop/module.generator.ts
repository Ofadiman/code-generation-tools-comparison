import { NodePlopAPI } from 'plop'
import { kebabCase } from 'lodash'

export const moduleGenerator: Parameters<NodePlopAPI['setGenerator']>[1] = {
  description: 'Generate a new module.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Module name (kebab-case)',
      validate: (value: string) => {
        const kebabCaseValue = kebabCase(value)

        const isKebabCase = kebabCaseValue === value
        if (!isKebabCase) {
          return `Module name must be in kebab-case.`
        }

        return true
      },
    },
  ],
  actions: [
    // Add import statement of the new module to the main module.
    {
      type: 'append',
      path: 'src/app.module.ts',
      template: `import { {{ pascalCase name }}Module } from './{{ name }}/{{ name }}.module'`,
      pattern: /from.+/u,
    },
    // Add import of the new module to the main module.
    {
      type: 'append',
      path: 'src/app.module.ts',
      template: `    {{ pascalCase name }}Module,`,
      pattern: /imports.+/u,
    },
    // Create a file containing the new module.
    {
      type: 'add',
      path: 'src/{{ name }}/{{ name }}.module.ts',
      template: `import { Module } from '@nestjs/common'
import { {{ pascalCase name }}Controller } from './{{ kebabCase name }}.controller'
import { {{ pascalCase name }}Service } from './{{ kebabCase name }}.service'
import { MongooseModule } from '@nestjs/mongoose'
import { {{ pascalCase ( singular name )}}, {{ pascalCase ( singular name )}}Schema } from './{{ singular name }}.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: {{ pascalCase ( singular name )}}.name, schema: {{ pascalCase ( singular name )}}Schema }])],
  controllers: [{{ pascalCase name }}Controller],
  providers: [{{ pascalCase name }}Service],
})
export class {{ pascalCase name }}Module {}
`,
    },
    // Create a file containing the controller.
    {
      type: 'add',
      path: 'src/{{ name }}/{{ name }}.controller.ts',
      template: `import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { {{ pascalCase name }}Service } from './{{ kebabCase name }}.service'
import { {{ pascalCase name }}ControllerCreateRequestBodyDto, {{ pascalCase name }}ControllerCreateResponseBodyDto } from './dto/{{ kebabCase name }}.create.dto'
import { {{ pascalCase name }}ControllerGetByIdRequestParamDto, {{ pascalCase name }}ControllerGetByIdResponseBodyDto } from './dto/{{ kebabCase name }}.get-by-id.dto'
  
@Controller('{{ kebabCase name }}')
export class {{ pascalCase name }}Controller {
  constructor(private readonly {{ camelCase name }}Service: {{ pascalCase name }}Service) {}
  
  @Post('')
  create(@Body() body: {{ pascalCase name }}ControllerCreateRequestBodyDto): Promise<{{ pascalCase name }}ControllerCreateResponseBodyDto> {
    return this.{{ camelCase name }}Service.create({})
  }

  @Get(':{{ camelCase ( singular name ) }}Id')
  getById(@Param() param: {{ pascalCase name }}ControllerGetByIdRequestParamDto): Promise<{{ pascalCase name }}ControllerGetByIdResponseBodyDto> {
    return this.{{ camelCase name }}Service.getById({ {{ camelCase ( singular name )}}Id: param.{{ camelCase ( singular name )}}Id })
  }
}
`,
    },
    // Create a file containing the service.
    {
      type: 'add',
      path: 'src/{{ name }}/{{ name }}.service.ts',
      template: `import { Injectable, NotFoundException } from '@nestjs/common'
import { {{ pascalCase ( singular name )}} } from './{{ kebabCase ( singular name ) }}.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class {{ pascalCase name }}Service {
  constructor(@InjectModel({{ pascalCase ( singular name )}}.name) private readonly {{ camelCase ( singular name )}}Model: Model<{{ pascalCase ( singular name )}}>) {}
  
  async create(args: {}) {
    const now = new Date().toISOString()

    return this.{{ camelCase ( singular name )}}Model.create({
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  }
  
  async getById(args: { {{ camelCase ( singular name )}}Id: string }) {
    const {{ camelCase name }} = await this.{{ camelCase ( singular name )}}Model.findOne({ _id: args.{{ camelCase ( singular name )}}Id })
    
    if (!{{ camelCase name }}) {
      throw new NotFoundException(\`{{ pascalCase ( singular name )}} with id \${args.{{ camelCase ( singular name ) }}Id} not found.\`)
    }
    
    return {{ camelCase name }}
  }
}
`,
    },
    // Create a file containing the DTOs for create action.
    {
      type: 'add',
      path: 'src/{{ name }}/dto/{{ kebabCase name }}.create.dto.ts',
      template: `import {} from 'class-validator'
import { {{ constantCase ( singular name ) }}_CONSTRAINTS } from '../{{ singular name }}.constraints'

export class {{ pascalCase name }}ControllerCreateRequestBodyDto {
}

export class {{ pascalCase name }}ControllerCreateResponseBodyDto {
}
`,
    },
    // Create a file containing the DTOs for getById action.
    {
      type: 'add',
      path: 'src/{{ name }}/dto/{{ kebabCase name }}.get-by-id.dto.ts',
      template: `import { IsMongoId } from 'class-validator'

export class {{ pascalCase name }}ControllerGetByIdRequestParamDto {
  @IsMongoId()
  public readonly {{ camelCase ( singular name ) }}Id: string
}

export class {{ pascalCase name }}ControllerGetByIdResponseBodyDto {}
`,
    },
    // Create a file containing schema.
    {
      type: 'add',
      path: 'src/{{ name }}/{{ singular name }}.schema.ts',
      template: `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { {{ constantCase ( singular name )}}_CONSTRAINTS } from './{{ singular name }}.constraints'

export type {{ pascalCase ( singular name ) }}Document = {{ pascalCase ( singular name ) }} & Document

export type {{ pascalCase ( singular name ) }}DocumentFields = {
  _id: string

  createdAt: Date
  updatedAt: Date
}

@Schema({ collection: '{{ snakeCase name }}', versionKey: false })
export class {{ pascalCase ( singular name ) }} implements Omit<{{ pascalCase ( singular name ) }}DocumentFields, '_id'> {
  @Prop({ required: true, type: Date })
  public createdAt: Date

  @Prop({ required: true, type: Date })
  public updatedAt: Date
}

export const {{ pascalCase ( singular name ) }}Schema = SchemaFactory.createForClass({{ pascalCase ( singular name ) }})
`,
    },
    // Create a file containing the constraints.
    {
      type: 'add',
      path: 'src/{{ name }}/{{ singular name }}.constraints.ts',
      template: `export const {{ constantCase ( singular name ) }}_CONSTRAINTS = {}
`,
    },
    {
      // Create a file containing mocks.
      type: 'add',
      path: 'src/{{ name }}/{{ singular name }}.mocks.ts',
      template: `import { {{ pascalCase ( singular name) }}DocumentFields } from './{{ singular name }}.schema'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { merge } from 'lodash'
import { TestDocumentFactory, TestDocumentFields } from '@test-utils'

export const createTest{{ pascalCase ( singular name) }}: TestDocumentFactory<{{ pascalCase ( singular name) }}DocumentFields> = (fields) => {
  const default{{ pascalCase ( singular name) }}Document: Required<TestDocumentFields<{{ pascalCase ( singular name) }}DocumentFields>> = {
    _id: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
    createdAt: new Date('2022-06-01T08:00:00.000Z'),
    updatedAt: new Date('2022-06-01T08:00:00.000Z'),
  }

  return merge(default{{ pascalCase ( singular name) }}Document, fields)
}
`,
    },
    // Create a file containing service tests.
    {
      type: 'add',
      path: 'src/{{ name }}/{{ name }}.service.unit.spec.ts',
      template: `import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { NotFoundException } from '@nestjs/common'
import { createModelMock, execute, MockedModel } from '@test-utils'
import { MethodArgs } from '@types'
import { {{ pascalCase name }}Service } from './{{ name }}.service'
import { {{ pascalCase (singular name )}} } from './{{ singular name }}.schema'
import { createTest{{ pascalCase (singular name )}} } from './{{ singular name }}.mocks'

let {{ camelCase name }}Service: {{ pascalCase name }}Service
let {{ camelCase ( singular name )}}Model: MockedModel

beforeEach(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    providers: [
      {{ pascalCase name }}Service,
      {
        provide: getModelToken({{ pascalCase (singular name )}}.name),
        useValue: createModelMock(),
      },
    ],
  }).compile()

  {{ camelCase name }}Service = testingModule.get<{{ pascalCase name }}Service>({{ pascalCase name }}Service)
  {{ camelCase ( singular name )}}Model = testingModule.get(getModelToken({{ pascalCase (singular name )}}.name))
})

describe('{{ pascalCase name }}Service', () => {
  describe('create', () => {
    const createArgs: MethodArgs<typeof {{ pascalCase name }}Service, 'create'> = {}

    it('should create {{ lowerCase ( sentenceCase ( singular name ) )}}', async () => {
      const result = await execute(async () => {
        return {{ camelCase name }}Service.create(createArgs)
      })

      expect(result.error).toBeNull()
      expect({{ camelCase ( singular name )}}Model.create).toHaveBeenCalledWith({})
    })
  })

  describe('getById', () => {
    it('should throw error when {{ lowerCase ( sentenceCase ( singular name ) )}} is not found', async () => {
      {{ camelCase ( singular name )}}Model.findOne.mockResolvedValueOnce(null)

      const result = await execute(async () => {
        return {{ camelCase name }}Service.getById({ {{ camelCase ( singular name )}}Id: '62c0044efacef7bcb0ecea45' })
      })

      expect(result.error).toBeInstanceOf(NotFoundException)
      expect({{ camelCase ( singular name )}}Model.findOne).toHaveBeenCalledWith({ _id: '62c0044efacef7bcb0ecea45' })
    })

    it('should return found {{ lowerCase ( sentenceCase ( singular name ) )}}', async () => {
      const found{{ pascalCase (singular name )}} = createTest{{ pascalCase (singular name )}}()
      {{ camelCase ( singular name )}}Model.findOne.mockResolvedValueOnce(found{{ pascalCase (singular name )}})

      const result = await execute(async () => {
        return {{ camelCase name }}Service.getById({ {{ camelCase ( singular name )}}Id: found{{ pascalCase (singular name )}}._id.toHexString() })
      })

      expect(result.error).toBeNull()
      expect(result.data).toEqual(found{{ pascalCase (singular name )}})
      expect({{ camelCase ( singular name )}}Model.findOne).toHaveBeenCalledWith({
        _id: found{{ pascalCase (singular name )}}._id.toHexString(),
      })
    })
  })
})
`,
    },
    // Create a file containing controller tests.
    {
      type: 'add',
      path: 'src/{{ name }}/{{ name }}.controller.integration.spec.ts',
      template: `import { Test, TestingModule } from '@nestjs/testing'
import { {{ pascalCase name }}Controller } from './{{ name }}.controller'
import { AppModule } from '../app.module'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Model } from 'mongoose'
import supertest from 'supertest'
import { {{ pascalCase ( singular name )}} } from './{{ singular name }}.schema'
import { getModelToken } from '@nestjs/mongoose'
import { {{ pascalCase name }}ControllerCreateRequestBodyDto } from './dto/{{ name }}.create.dto'
import { createTest{{ pascalCase ( singular name )}} } from './{{ singular name }}.mocks'

let nestApplication: INestApplication
let {{ camelCase ( singular name )}}Model: Model<{{ pascalCase ( singular name )}}>

const first{{ pascalCase ( singular name )}} = createTest{{ pascalCase ( singular name )}}()
const second{{ pascalCase ( singular name )}} = createTest{{ pascalCase ( singular name )}}()

beforeAll(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  nestApplication = testingModule.createNestApplication()
  await nestApplication.init()
  {{ camelCase ( singular name )}}Model = nestApplication.get(getModelToken({{ pascalCase ( singular name )}}.name))
})

beforeEach(async () => {
  await {{ camelCase ( singular name )}}Model.create(first{{ pascalCase ( singular name )}})
  await {{ camelCase ( singular name )}}Model.create(second{{ pascalCase ( singular name )}})
})

afterEach(async () => {
  await {{ camelCase ( singular name )}}Model.deleteMany({})
})

afterAll(async () => {
  await nestApplication.close()
})

describe('{{ pascalCase name }}Controller', () => {
  describe('create {{ lowerCase ( sentenceCase ( singular name ) )}}', () => {
    it('should create {{ lowerCase ( sentenceCase ( singular name ) )}}', async () => {
      const body: {{ pascalCase name }}ControllerCreateRequestBodyDto = {}

      const response = await supertest(nestApplication.getHttpServer()).post('/{{ name }}').send(body)

      expect(response.body).toMatchSnapshot({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(response.status).toBe(HttpStatus.CREATED)
    })
  })

  describe('get {{ lowerCase ( sentenceCase ( singular name ) )}} by id', () => {
    it('should throw error when {{ lowerCase ( sentenceCase ( singular name ) )}} does not exist', async () => {
      const response = await supertest(nestApplication.getHttpServer())
        .get(\`/{{ name }}/62c3261b4bc318d862a90a71\`)
        .send()

      expect(response.body).toMatchSnapshot()
      expect(response.status).toBe(HttpStatus.NOT_FOUND)
    })

    it('should get {{ lowerCase ( sentenceCase ( singular name ) )}} by id', async () => {
      const response = await supertest(nestApplication.getHttpServer())
        .get(\`/{{ name }}/\${first{{ pascalCase ( singular name )}}._id}\`)
        .send()

      expect(response.body).toMatchSnapshot({
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(response.status).toBe(HttpStatus.OK)
    })
  })
})
`,
    },
  ],
}
