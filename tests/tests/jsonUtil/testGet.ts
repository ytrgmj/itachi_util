import JsonUtil from '../../../src/util/JsonUtil'
var obj = {
    aa1:{
        aa2:{
            aa3:123
        }
    }
}
test('测试Get',function(){
    expect(JsonUtil.get(obj,['aa1','aa2','aa3'])).toBe(123);
    expect(JsonUtil.get(obj,['bb1','bb2','bb3'])).toBeNull();
})