import { NodePlopAPI } from 'plop'
import { constantGenerator } from './plop/constant/generator'

export default function (plop: NodePlopAPI) {
  plop.setGenerator('constant', constantGenerator)
}
