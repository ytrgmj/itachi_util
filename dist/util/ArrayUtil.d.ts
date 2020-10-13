interface GroupByParam {
    list?: Array<any>;
    array?: Array<any>;
    key: any;
    fun: Function;
}
interface AbsJoinParam {
    list: Array<any>;
    list2: Array<any>;
    fun?: Function;
    keys?: Array<string>;
}
interface JoinOpt {
    list: Array<any>;
    list2: Array<any>;
    /**
     * 两边都有的死后处理的函数
     * function(array1,array2,e)
     */
    fun: Function;
    /**
     * 对应的key
     */
    key: Function | string | Array<string>;
    /**
     * 默认和key相同
     */
    key2?: Function | string | Array<string>;
    /**
     * 只有数组1有的时候处理函数
     * function(array,e)
     */
    onlyOne?: Function;
    /**
     * 只有数组2有的时候处理函数
     * function(array,e)
     */
    onlyTwo?: Function;
}
export declare class ArrayUtil {
    static sum(array: Array<any>, key?: Array<string> | Function | string): number;
    static distinctByKey(array: any, keys: string | Function | Array<string>): any[];
    /**
     * 根据这个产生一个key
     * @param obj
     * @param keys
     */
    static get(obj: any, keys: string | Function | Array<string>): any;
    /**
     * 排序
     * @param array 排序数组
     * @param opts string|{order:'name',desc:'desc'}
     *
     *
     */
    static order(array: any, opts: any): Array<any>;
    /**
     对数组做group by操作
    opt:{
        list:list, //数组
        key:key, //分组的key
        fun:fun(list,e) // 处理函数
    }
    */
    static groupBy(opt: GroupByParam): Array<any>;
    /**
     * 将 通过比较key将两个数组按and的方式and
       
        array1:数组1
        array2:数组2
        key1
        key2
     */
    static andByKey(array1: Array<any>, array2: Array<any>, key1?: any, key2?: any): any[];
    static inArray(array: Array<any>, obj: any): boolean;
    static and(array1: any, array2: any): Array<any>;
    static distinct(array: Array<any>): Array<any>;
    /**
    建议使用
     * 根据key 转化为map
     * @param array
     * @param key
     */
    static toMapByKey(array: any[], key: any, fun?: Function | string): {};
    /**
     * @description 将一个list按key分组，放在map中
     */
    static toMapArray(list: any[], key: any, fun?: Function): {};
    static copy(destArray: any, srcArray: any, maxLen: any): any;
    static toMap(array: any): {};
    /**
     * 两个数组求not_in,根据key 来 进行
     * @param array1
     * @param array2
     * @param key
     * @param key2
     */
    static notInByKey(array1: any[], array2: any[], key?: any, key2?: any): any[];
    /**
    第二个参数可以是function、map、array
    */
    static filter(array: any, fun: any): Array<any>;
    /**
     * 找出在array1 不在array2的数据
     */
    static notIn(array1: any, array2: any): Array<any>;
    /**
     * 将一个数组转换成另外一个数组
     * 和系统的map 类似
     * 之处传入一个asyn 函数，支持函数返回值为数组，将每次运行返回的数组组合成一个数组
     * @param list
     * @param fun
     */
    static map(list: Array<any>, fun: any): Promise<any[]>;
    static parse(array: any, fun?: Function): any[];
    /**
     * 根据fun转化array后返回
     * @param array
     * @param fun
     * @returns
     */
    private static _parseArray;
    static addAll(array1: any, array2: any): any;
    static toArray(array: any, key: string | Function | Array<string>): any[];
    static isSame(array1: Array<any>, array2: Array<any>): boolean;
    static orByKey(array1: any, array2: any, key1?: string | Array<string> | Function, key2?: string | Array<string> | Function): any[];
    /**
    两个list进行join操作,
    类似数据库中inner join
    {
        list:[],
        list2:[],
        fun:function(data,data1){
            return data
        },
        key:function(){ //可以是function 也可以是key 在list中必须唯一

        },
        key2:function(){

        },
        onlyOne:function(data){ //只有第一个数组有的情况

        },
        onlyTwo:function(data){ //只存在2，不存在1

        }

    }
    */
    static join(opt: JoinOpt): Array<any>;
    /**
    两个list进行map操作,
    joinArray 方法和join类似，
    join 是一对一的关系，
    joinArray 是一对多的关系
    list2 是多条数据
    类似数据库中inner join
    {
        list:[],
        list2:[],
        fun:function(data,array){
            return data
        },
        key:function(){ //可以是function 也可以是key 在list中必须唯一

        },
        key2:function(){

        },
        onlyOne:function(data){ //只有第一个数组有的情况

        },
        onlyTwo:funtion(data){ //只存在2，不存在1

        }

    }
    */
    static joinArray(opt: JoinOpt): any[];
    /**
    两个list进行join操作,
    类似数据库中inner join
    和join不同是 两个数组都存在多个
    {
        list:[],
        list2:[],
        fun:function(array1,array2,key){
            return data
        },
        key:function(){ //可以是function 也可以是key 在list中必须唯一

        },
        key2:function(){

        },
        onlyOne:function(array,key){ //只有第一个数组有的情况

        },
        onlyTwo:funtion(data){ //只存在2，不存在1

        }

    }
    */
    static joinMany(opt: JoinOpt): any[];
    /**
     * 根据字段取得某个值的数组 并去重
     * @param array
     * @param key
     */
    static toArrayDis(array: Array<any>, key: string): Array<any>;
    /**
     * 将一个mapArray 转成map
     * @param map
     */
    static mapArray2Array(map: any): any[];
    /**
     * 判断两个数组是否相等
     * @param array1
     * @param array2
     * @param key
     */
    static isSameByKey(array1: Array<any>, array2: Array<any>, key: string | Array<string> | Function): boolean;
    /**
    将两个数组笛卡尔相乘，返回一个新数组
    新数组的长度 是两个数组的长度乘积
    新数组的内容是fun函数的执行结果，null不会保存到结果里面
    opt{
        list:[],
        list2:[],
        fun:function(data,data2 ,i,t) //i和t 是数组的索引
    }
    */
    static absJoin(opt: AbsJoinParam): any[];
}
export {};
