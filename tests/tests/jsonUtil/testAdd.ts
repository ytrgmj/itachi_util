import JsonUtil from '../../../src/util/JsonUtil'

var obj = {
    
}

test('测试add',function(){
    JsonUtil.add(obj,['aa1','aa2','aa3'],123);
    expect(JsonUtil.get(obj,['aa1','aa2','aa3']).length).toBe(1);
    JsonUtil.add(obj,['aa1','aa2','aa3'],456);
    expect(JsonUtil.get(obj,['aa1','aa2','aa3']).length).toBe(2);
    console.log(JsonUtil.get(obj,['aa1','aa2','aa3']))
})