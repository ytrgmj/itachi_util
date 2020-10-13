"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function init(obj, keys) {
    for (var i = 0; i < keys.length - 1; i++) {
        var key = keys[i];
        if (obj[key] == null) {
            obj[key] = {};
        }
        obj = obj[key];
    }
    return obj;
}
function setKey(obj, key, param) {
    if (key instanceof Function) {
        key(obj, param);
    }
    else {
        obj[key] = param;
    }
    return param;
}
class JsonUtil {
    /**
    把一个值加到数组中
    
   obj 目标
   keys 设置的key列表
   param 设置值
  */
    static add(obj, keys, param) {
        if (keys == null) {
            return;
        }
        if (!(keys instanceof Array)) {
            keys = [keys];
        }
        if (keys.length == 0 ||
            obj == null ||
            param == null) {
            return;
        }
        var obj = init(obj, keys);
        var key = keys[keys.length - 1];
        if (key) {
            if (obj[key] == null) {
                obj[key] = [];
            }
        }
        obj[key].push(param);
        return obj;
    }
    /**
     设置一个值
     obj 目标
     keys 设置的key列表
     param 设置值
    */
    static set(obj, keys, param) {
        if (keys == null) {
            return;
        }
        if (!(keys instanceof Array)) {
            keys = [keys];
        }
        if (keys.length == 0 ||
            obj == null ||
            param == null) {
            return;
        }
        var obj = init(obj, keys);
        var key = keys[keys.length - 1];
        if (key) {
            setKey(obj, key, param);
        }
        return param;
    }
    /**
     * 取值
     * @param obj
     * @param keys
     */
    static get(obj, keys) {
        if (keys == null) {
            return null;
        }
        if (!(keys instanceof Array)) {
            keys = [keys];
        }
        for (var key of keys) {
            if (obj == null) {
                return null;
            }
            obj = obj[key];
        }
        return obj;
    }
}
exports.default = JsonUtil;
