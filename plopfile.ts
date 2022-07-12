import { NodePlopAPI } from 'plop'
import { constantGenerator } from './plop/constant.generator'
import { functionalityGenerator } from './plop/functionality.generator'
import { plural, singular } from 'pluralize'
import { moduleGenerator } from './plop/module.generator'
import { functionGenerator } from './plop/function.generator'

export default function (plop: NodePlopAPI) {
  plop.setHelper('plural', plural)
  plop.setHelper('singular', singular)

  plop.setGenerator('constant', constantGenerator)
  plop.setGenerator('functionality', functionalityGenerator)
  plop.setGenerator('module', moduleGenerator)
  plop.setGenerator('function', functionGenerator)
}
