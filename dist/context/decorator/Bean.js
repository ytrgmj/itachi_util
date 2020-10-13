"use strict";
/**
 * 为属性指定bean
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(beanId) {
    return function (target, propertyName) {
        /*
        if(target.__beanConfig == null){
            target.__beanConfig = new BeanConfig();
        }
        let beanConfig:BeanConfig = target.__beanConfig;
        if(beanId == null){
            beanId = propertyName;
        }
        beanConfig.add(propertyName,beanId)
        */
        BeanConfig_1.default.addProperty(target, propertyName, beanId);
    };
}
exports.default = default_1;
const BeanConfig_1 = __importDefault(require("../bean/BeanConfig"));
