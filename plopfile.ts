import { NodePlopAPI } from 'plop'
import { constantGenerator } from './plop/constant.generator'
import { functionalityGenerator } from './plop/functionality.generator'

export default function (plop: NodePlopAPI) {
  plop.setGenerator('constant', constantGenerator)
  plop.setGenerator('functionality', functionalityGenerator)
}
