"use strict";
/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-10 16:11:59
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-11 19:33:16
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtil = void 0;
/**
从一个元素中取值
也支持有function
*/
function get(obj, key) {
    if (key == null)
        return obj;
    if (key instanceof Function) {
        return key(obj);
    }
    var ret = [];
    if (key instanceof Array) {
        for (var k of key) {
            ret.push(obj[k]);
        }
        return ret.join('___');
    }
    else {
        return obj[key];
    }
}
class ArrayUtil {
    static sum(array, key) {
        var ret = 0;
        if (!array)
            return 0;
        var len = array.length;
        for (var i = 0; i < len; i++) {
            var obj = array[i];
            if (key) {
                var val = get(obj, key);
                if (val != null) {
                    ret += val;
                }
            }
            else {
                ret += obj;
            }
        }
        return ret;
    }
    static distinctByKey(array, keys) {
        var map = ArrayUtil.toMapByKey(array, keys);
        var list = [];
        for (var e in map) {
            list.push(map[e]);
        }
        return list;
    }
    /**
     * 根据这个产生一个key
     * @param obj
     * @param keys
     */
    static get(obj, keys) {
        return get(obj, keys);
    }
    /**
     * 排序
     * @param array 排序数组
     * @param opts string|{order:'name',desc:'desc'}
     *
     *
     */
    static order(array, opts) {
        if (!(opts instanceof Array)) {
            if (opts.order == null) {
                opts = {
                    order: opts
                };
            }
            opts = [opts];
        }
        function sort(obj1, obj2) {
            function createFun(opt) {
                if (opt.fun) {
                    return opt.fun;
                }
                return function (obj1, obj2) {
                    var order = opt.order;
                    var desc = opt.desc;
                    var ret = 0;
                    let d1 = get(obj1, order);
                    let d2 = get(obj2, order);
                    if (d1 == null && d2 == null) {
                        ret = 0;
                    }
                    else if (d1 == null && d2 != null) {
                        ret = -1;
                    }
                    else if (d1 != null && d2 == null) {
                        ret = 1;
                    }
                    else {
                        if ((d1 instanceof Date)) {
                            d1 = d1.getTime();
                        }
                        if ((d2 instanceof Date)) {
                            d2 = d2.getTime();
                        }
                        if (d1 < d2) {
                            ret = -1;
                        }
                        else if (d1 > d2) {
                            ret = 1;
                        }
                    }
                    if (desc == 'desc') {
                        ret = ret * -1;
                    }
                    return ret;
                };
            }
            var funs = ArrayUtil.parse(opts, createFun);
            for (var i = 0; i < funs.length; i++) {
                var ret = funs[i](obj1, obj2);
                if (ret != 0 || i == funs.length - 1) {
                    return ret;
                }
            }
        }
        array.sort(sort);
        return array;
    }
    /**
     对数组做group by操作
    opt:{
        list:list, //数组
        key:key, //分组的key
        fun:fun(list,e) // 处理函数
    }
    */
    static groupBy(opt) {
        if (opt == null) {
            return null;
        }
        if (opt.key == null) {
            throw new Error('opt不能为null');
        }
        var list = opt.list || opt.array;
        if (list == null) {
            return null;
        }
        var fun = opt.fun;
        if (fun == null) {
            fun = array => array;
        }
        var key = opt.key;
        if (key == null) {
            key = 'id';
        }
        var map = ArrayUtil.toMapArray(list, key);
        var ret = [];
        for (var e in map) {
            var row = fun(map[e], e);
            if (row != null) {
                if (row instanceof Array) {
                    ret.push(...row);
                }
                else {
                    ret.push(row);
                }
            }
        }
        return ret;
    }
    /**
     * 将 通过比较key将两个数组按and的方式and
       
        array1:数组1
        array2:数组2
        key1
        key2
     */
    static andByKey(array1, array2, key1, key2) {
        if (key1 == null) {
            key1 = (row) => row;
        }
        if (key2 == null) {
            key2 = key1;
        }
        var map = ArrayUtil.toMapByKey(array1, key1);
        var retMap = {};
        var ret = [];
        for (var i = 0; i < array2.length; i++) {
            var item = array2[i];
            var keyValue = get(item, key2);
            if (map[keyValue]) {
                retMap[keyValue] = map[keyValue];
            }
        }
        for (var e in retMap) {
            ret.push(retMap[e]);
        }
        return ret;
    }
    static inArray(array, obj) {
        if (obj == null)
            return false;
        if (!Array.isArray(obj)) {
            var len = array.length;
            for (var i = 0; i < len; i++) {
                if (obj == array[i]) {
                    return true;
                }
            }
            return false;
        }
        else {
            obj = ArrayUtil.distinct(obj);
            var list = ArrayUtil.and(array, obj);
            return list.length == obj.length;
        }
    }
    static and(array1, array2) {
        var map = ArrayUtil.toMap(array1);
        var retMap = {};
        var ret = [];
        for (var i = 0; i < array2.length; i++) {
            var val = array2[i];
            if (map[val]) {
                retMap[val] = val;
            }
        }
        for (var e in retMap) {
            ret.push(retMap[e]);
        }
        return ret;
    }
    static distinct(array) {
        if (array == null || array.length == 0)
            return array;
        var map = {};
        for (let row of array) {
            map[row] = row;
        }
        var ret = [];
        for (var e in map) {
            ret.push(map[e]);
        }
        return ret;
    }
    /**
    建议使用
     * 根据key 转化为map
     * @param array
     * @param key
     */
    static toMapByKey(array, key, fun) {
        if (fun == null) {
            fun = (data) => {
                return data;
            };
        }
        let map = {};
        if (!key)
            key = 'id';
        if (array) {
            const len = array.length;
            for (let i = 0; i < len; i++) {
                let data = array[i];
                let mapKey = get(data, key);
                map[mapKey] = get(data, fun);
            }
        }
        return map;
    }
    /**
     * @description 将一个list按key分组，放在map中
     */
    static toMapArray(list, key, fun) {
        if (fun == null) {
            fun = (data) => data;
        }
        var ret = {};
        if (list != null && key != null) {
            for (let i = 0; i < list.length; i++) {
                let data = list[i];
                let val = get(data, key);
                let mapData = get(data, fun);
                if (val != null && mapData != null) {
                    var array = ret[val];
                    if (array == null) {
                        array = [];
                        ret[val] = array;
                    }
                    array.push(mapData);
                }
            }
        }
        return ret;
    }
    static copy(destArray, srcArray, maxLen) {
        if (destArray == null)
            return [];
        if (srcArray == null)
            return destArray;
        var len = srcArray.length;
        if (maxLen != null && maxLen >= 0 && maxLen < len) {
            len = maxLen;
        }
        for (let i = 0; i < len; i++) {
            destArray.push(srcArray[i]);
        }
        return destArray;
    }
    static toMap(array) {
        let obj = {};
        if (array) {
            if (!(array instanceof Array)) {
                array = [array];
            }
            for (let i = 0; i < array.length; i++) {
                obj[array[i]] = true;
            }
        }
        return obj;
    }
    /**
     * 两个数组求not_in,根据key 来 进行
     * @param array1
     * @param array2
     * @param key
     * @param key2
     */
    static notInByKey(array1, array2, key, key2) {
        if (key == null) {
            return ArrayUtil.notIn(array1, array2);
        }
        if (key2 == null) {
            key2 = key;
        }
        var map = ArrayUtil.toMapByKey(array2, key2);
        var retMap = {};
        for (let i = 0; i < array1.length; i++) {
            var val = array1[i];
            var valKey = get(val, key);
            if (map[valKey] == null) {
                retMap[valKey] = val;
            }
        }
        var array = [];
        for (var e in retMap) {
            array.push(retMap[e]);
        }
        return array;
    }
    /**
    第二个参数可以是function、map、array
    */
    static filter(array, fun) {
        var ret = [];
        for (var i = 0; i < array.length; i++) {
            if (fun(array[i], i)) {
                ret.push(array[i]);
            }
        }
        return ret;
    }
    /**
     * 找出在array1 不在array2的数据
     */
    static notIn(array1, array2) {
        var map = ArrayUtil.toMap(array2);
        var retMap = {};
        for (var i = 0; i < array1.length; i++) {
            var val = array1[i];
            if (map[val] == null) {
                retMap[val] = val;
            }
        }
        var ret = [];
        for (var e in retMap) {
            ret.push(retMap[e]);
        }
        return ret;
    }
    /**
     * 将一个数组转换成另外一个数组
     * 和系统的map 类似
     * 之处传入一个asyn 函数，支持函数返回值为数组，将每次运行返回的数组组合成一个数组
     * @param list
     * @param fun
     */
    static map(list, fun) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = [];
            for (var i = 0; i < list.length; i++) {
                var funRet = yield fun(list[i], i);
                if (funRet != null) {
                    if (funRet instanceof Array) {
                        ArrayUtil.addAll(ret, funRet);
                    }
                    else {
                        ret.push(funRet);
                    }
                }
            }
            return ret;
        });
    }
    static parse(array, fun) {
        if (!array)
            return [];
        if (!(array instanceof Array)) {
            array = [array];
        }
        return ArrayUtil._parseArray(array, fun);
    }
    /**
     * 根据fun转化array后返回
     * @param array
     * @param fun
     * @returns
     */
    static _parseArray(array, fun) {
        if (!array)
            return [];
        if (!fun) {
            return array;
        }
        var ret = [];
        for (let i = 0; i < array.length; i++) {
            var obj = fun(array[i], i);
            if (obj != null) {
                ret.push(obj);
            }
        }
        return ret;
    }
    static addAll(array1, array2) {
        if (array1 == null)
            array1 = [];
        if (array2 == null)
            return array1;
        if (!(array2 instanceof Array)) {
            array1.push(array2);
        }
        else {
            for (var i = 0; i < array2.length; i++) {
                array1.push(array2[i]);
            }
        }
        return array1;
    }
    static toArray(array, key) {
        if (!(array instanceof Array))
            array = [array];
        if (!key)
            key = 'id';
        var ret = [];
        if (array) {
            for (let i = 0; i < array.length; i++) {
                var obj = get(array[i], key);
                if (obj != null) {
                    ret.push(obj);
                }
            }
        }
        return ret;
    }
    static isSame(array1, array2) {
        function _isSame(a, b) {
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            if (aProps.length != bProps.length) {
                return false;
            }
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }
            return true;
        }
        if (array1 == null || array2 == null) {
            return false;
        }
        if (array1.length != array2.length)
            return false;
        for (var i = 0; i < array1.length; i++) {
            if (!_isSame(array1[i], array2[i])) {
                return false;
            }
        }
        return true;
    }
    static orByKey(array1, array2, key1, key2) {
        if (key1 == null) {
            key1 = (row) => row;
        }
        if (key2 == null)
            key2 = key1;
        var map = ArrayUtil.toMapByKey(array1, key1);
        for (var i = 0; i < array2.length; i++) {
            var data = array2[i];
            var key = get(data, key2);
            if (map[key] == null) {
                map[key] = data;
            }
        }
        var array = [];
        for (var e in map) {
            array.push(map[e]);
        }
        return array;
    }
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
    static join(opt) {
        var list = opt.list;
        var list2 = opt.list2;
        if (list == null ||
            list2 == null) {
            return [];
        }
        var key = opt.key;
        var key2 = opt.key2;
        var fun = opt.fun;
        if (key == null) {
            key = 'id';
        }
        if (key2 == null) {
            key2 = key;
        }
        if (fun == null) {
            fun = function (data) {
                return data;
            };
        }
        var onlyOne = opt.onlyOne;
        var onlyTwo = opt.onlyTwo;
        var map = ArrayUtil.toMapByKey(list, key);
        var ret = [];
        for (var i = 0; i < list2.length; i++) {
            var data2 = list2[i];
            var keyValue = get(data2, key2);
            var data1 = map[keyValue];
            if (data1 != null) {
                var row = fun(data1, data2);
                if (row != null) {
                    ret.push(row);
                }
            }
            else {
                if (onlyTwo != null) {
                    var row = onlyTwo(data2);
                    if (row != null) {
                        ret.push(row);
                    }
                }
            }
        }
        if (onlyOne != null) {
            var map2 = ArrayUtil.toMapByKey(list2, key2);
            for (var i = 0; i < list.length; i++) {
                var data1 = list[i];
                var keyValue = get(data1, key);
                var data2 = map2[keyValue];
                if (data2 == null) {
                    var row = onlyOne(data1);
                    if (row != null) {
                        ret.push(row);
                    }
                }
            }
        }
        return ret;
    }
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
    static joinArray(opt) {
        var list = opt.list;
        var list2 = opt.list2;
        if (list == null && list2 == null)
            return [];
        if (list == null) {
            list = [];
        }
        if (list2 == null)
            list2 = [];
        var key = opt.key;
        var key2 = opt.key2;
        var fun = opt.fun;
        if (key == null) {
            key = 'id';
        }
        if (key2 == null) {
            key2 = key;
        }
        if (fun == null) {
            fun = function (data) {
                return data;
            };
        }
        var map = ArrayUtil.toMapByKey(list, key);
        var map2 = ArrayUtil.toMapArray(list2, key2);
        var ret = [];
        for (var e in map) {
            var data = map[e];
            var array = map2[e];
            if (array != null) {
                var row = fun(data, array);
                ArrayUtil.addAll(ret, row);
            }
            else {
                if (opt.onlyOne) {
                    var row = opt.onlyOne(data);
                    ArrayUtil.addAll(ret, row);
                }
            }
        }
        if (opt.onlyTwo) {
            for (var e in map2) {
                if (map[e] == null) {
                    var row = opt.onlyTwo(map2[e]);
                    ArrayUtil.addAll(ret, row);
                }
            }
        }
        return ret;
    }
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
    static joinMany(opt) {
        var list = opt.list;
        var list2 = opt.list2;
        var onlyOne = opt.onlyOne;
        var onlyTwo = opt.onlyTwo;
        if (list == null ||
            list2 == null) {
            return [];
        }
        var key = opt.key;
        var key2 = opt.key2;
        var fun = opt.fun;
        if (key == null) {
            key = 'id';
        }
        if (key2 == null) {
            key2 = key;
        }
        if (fun == null) {
            fun = function (data) {
                return data;
            };
        }
        var map = ArrayUtil.toMapArray(list, key);
        var map2 = ArrayUtil.toMapArray(list2, key2);
        var ret = [];
        for (var e in map2) {
            var array2 = map2[e];
            var array = map[e];
            if (array != null) {
                ArrayUtil.addAll(ret, fun(array, array2, e));
            }
            else {
                if (onlyTwo)
                    ArrayUtil.addAll(ret, onlyTwo(array2, e));
            }
        }
        if (onlyOne != null) {
            for (var e in map) {
                var array = map[e];
                var array2 = map2[e];
                if (array2 == null) {
                    ArrayUtil.addAll(ret, onlyOne(array, e));
                }
            }
        }
        return ret;
    }
    /**
     * 根据字段取得某个值的数组 并去重
     * @param array
     * @param key
     */
    static toArrayDis(array, key) {
        if (array == null)
            return null;
        array = ArrayUtil.toArray(array, key);
        return ArrayUtil.distinct(array);
    }
    /**
     * 将一个mapArray 转成map
     * @param map
     */
    static mapArray2Array(map) {
        let array = [];
        for (var e in map) {
            ArrayUtil.addAll(array, map[e]);
        }
        return array;
    }
    /**
     * 判断两个数组是否相等
     * @param array1
     * @param array2
     * @param key
     */
    static isSameByKey(array1, array2, key) {
        if (array1 == null && array2 == null)
            return true;
        if (array1 == null || array2 == null)
            return false;
        if (array1.length != array2.length)
            return false;
        for (let i = 0; i < array1.length; i++) {
            if (get(array1[i], key) != get(array2[i], key))
                return false;
        }
        return true;
    }
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
    static absJoin(opt) {
        var array = [];
        var list = opt.list;
        var list2 = opt.list2;
        if (opt.fun == null) {
            let keys = opt.keys;
            opt.fun = function (data1, data2) {
                let obj = {};
                obj[keys[0]] = data1[keys[0]];
                obj[keys[1]] = data2[keys[1]];
                return obj;
            };
        }
        for (var i = 0; i < list.length; i++) {
            for (var t = 0; t < list2.length; t++) {
                var row = opt.fun(list[i], list2[t], i, t);
                if (row != null) {
                    array.push(row);
                }
            }
        }
        return array;
    }
}
exports.ArrayUtil = ArrayUtil;
