import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { DemoOptions } from './index.schema'

export function demo(options: DemoOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log('options')
    console.log(JSON.stringify(options, null, 2))

    return tree
  }
}
