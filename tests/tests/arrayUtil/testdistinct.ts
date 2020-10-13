import {ArrayUtil} from '../../../src/util/ArrayUtil'

//pid 餐品id no:'订单号'
var list = [
    1,2,3,1,2,5
]

test('演示分单',function(){
   console.log(ArrayUtil.distinct(list));
    

})