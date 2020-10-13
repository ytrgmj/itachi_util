"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
class ComponentBuilder {
    constructor() {
        this._map = {};
    }
    add(componentId, beanId) {
        this._map[componentId] = beanId;
    }
    build(context) {
        let map = this._map;
        let retMap = new Map();
        retMap['getBeanConfig$$'] = function () {
            let ins = this._beanConfig;
            if (ins == null) {
                ins = new ComponentBeanConfig_1.default(map);
                this._beanConfig = ins;
            }
            return ins;
        };
        return retMap;
    }
    afterBuild() {
    }
}
exports.default = ComponentBuilder;
const ComponentBeanConfig_1 = __importDefault(require("./imp/ComponentBeanConfig"));
