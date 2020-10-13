import {ArrayUtil} from '../../../src/util/ArrayUtil'

var list = [
  {
    id: 1, name: 'aaa'
  },
  {
    id: 2, name: 'aaa'
  },
  {
    id: 1, name: 'xxx'
  },
  {
    id: 3, name: 'xxx'
  },
  {
    id: 2, name: 'bbb'
  }
]
console.log(ArrayUtil.toArrayDis(list, 'id'))
console.log(ArrayUtil.toArrayDis(list, 'name'))