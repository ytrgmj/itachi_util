/**
 * 为属性指定bean
 */

export default function(beanId?:string) {
    return function(target: any, propertyName: string) {
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
       BeanConfig.addProperty(target,propertyName,beanId)
    }
}
import BeanConfig from '../bean/BeanConfig'
