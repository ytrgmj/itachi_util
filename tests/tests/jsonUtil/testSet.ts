import JsonUtil from '../../../src/util/JsonUtil'

var obj = {
    
}
var obj1 = {
    aa1:{
        bb1:456
    }   
}
test('测试set',function(){
    JsonUtil.set(obj,['aa1','aa2','aa3'],123);
    expect(JsonUtil.get(obj,['aa1','aa2','aa3'])).toBe(123);

    JsonUtil.set(obj1,['aa1','aa2','aa3'],123);
    expect(JsonUtil.get(obj1,['aa1','aa2','aa3'])).toBe(123);
    expect(JsonUtil.get(obj1,['aa1','bb1'])).toBe(456);
})