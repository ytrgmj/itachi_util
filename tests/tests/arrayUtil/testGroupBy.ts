import {ArrayUtil} from '../../../src/util/ArrayUtil'

//pid 餐品id no:'订单号'
var list = [
    {pid:1,name:'小白菜',no:1000},
    {pid:2,name:'鸡蛋',no:1001},
    {pid:1,name:'小白菜',no:1002},
    {pid:2,name:'鸡蛋',no:1003},
    {pid:3,name:'火腿',no:1004},
    {pid:1,name:'小白菜',no:1005},
]

test('演示分单',function(){
    console.log('111111');
    
    var array = ArrayUtil.groupBy({
        list,
        key:'pid',
        fun(datas,e){
            var objs = [];
            var obj = null;
            for(var data of datas){
                if(obj == null || data.no-obj.no>=5){
                    obj = {
                        no:data.no,
                        name:data.name,
                        pid:data.pid,
                        cnt:1,
                        nos:[data.no]
                    }
                    objs.push(obj);
                }else{
                    obj.cnt ++;
                    obj.nos.push(data.no);
                }
            }
            return objs;
        }
    })
    console.log('array',array);
    

})