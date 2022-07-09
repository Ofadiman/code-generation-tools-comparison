import { strings } from '@angular-devkit/core'
import {
  apply,
  branchAndMerge,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'
import { normalize } from 'node:path'
import { ConstantOptions } from './index.schema'

export function constant(options: ConstantOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    console.log('options')
    console.log(JSON.stringify(options, null, 2))

    if (!options.name) {
      throw new SchematicsException('Option (name) is required.')
    }

    const path = normalize(`src/@constants`)
    const templateSource = apply(url('./files'), [
      template({
        constantalize: (string: string): string => {
          return strings.underscore(string).toUpperCase()
        },
        ...strings,
        ...options,
      }),
      move(path),
    ])

    const content = tree.read(`${path}/index.ts`)!.toString()
    const line = `export * from './${strings.dasherize(options.name)}.constants'\n`
    tree.overwrite(`${path}/index.ts`, `${line}${content}`)

    return branchAndMerge(mergeWith(templateSource))(tree, context)
  }
}
