import {ArrayUtil} from '../../../src/util/ArrayUtil'

let aa1 = [1,2,3]
let aa2 = [4,5,3]


let bb1 = [{id:1},{id:2},{id:3}]
let bb2 = [{id:3},{id:5},{id:4}]
test('testOrbykey',function(){
    let list = ArrayUtil.orByKey(aa1,aa2)
    console.log(list);
    let list2 = ArrayUtil.orByKey(bb1,bb2,'id')
    console.log(list2);
})