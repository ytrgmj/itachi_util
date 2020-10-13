"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BeanConfig_1 = __importDefault(require("../BeanConfig"));
class ComponentBeanConfig extends BeanConfig_1.default {
    assembly(bean, beanId, pro) {
        bean.set(beanId, pro);
    }
}
exports.default = ComponentBeanConfig;
