"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BeanConfig {
    constructor(map) {
        this._assmblied = false;
        this._map = {};
        this.funNameOfSet = '';
        if (map != null)
            this._map = map;
    }
    assembly(bean, beanId, pro) {
        bean[beanId] = pro;
    }
    getFunNameOfSet() {
        return this.funNameOfSet;
    }
    /**
     * 是否装配完成
     */
    isAssembly() {
        return this._assmblied;
    }
    ;
    /**
     * 设置是否装配完成
     * @param val
     */
    setAssembly(val) {
        this._assmblied = val;
    }
    /**
     * 返回需要的依赖beanId
     */
    getNeedsMap() {
        return this._map;
    }
    /**
     * 返回依赖列表
     */
    getNeeds() {
        let list = [];
        let map = this._map;
        for (var e in map) {
            list.push(map[e]);
        }
        return list;
    }
    /**
     * 设置依赖
     * @param propertyKey
     * @param beanId
     */
    add(propertyName, beanId) {
        this._map[propertyName] = beanId;
    }
    static addProperty(target, propertyName, beanId) {
        if (beanId == null) {
            beanId = propertyName;
        }
        beanId = beanId.toLowerCase();
        var needMap = { [propertyName]: beanId };
        if (target.__needMap != null) {
            let oldMap = target.__needMap;
            for (var e in oldMap) {
                needMap[e] = oldMap[e];
            }
        }
        target.__needMap = needMap;
        BeanConfig.addBeanConfigFun(target);
    }
    static addBeanConfigFun(target) {
        if (target.getBeanConfig$$ == null) {
            target.getBeanConfig$$ = function () {
                if (this.__beanConfig == null) {
                    this.__beanConfig = new BeanConfig(this.__needMap);
                }
                return this.__beanConfig;
            };
        }
    }
}
exports.default = BeanConfig;
