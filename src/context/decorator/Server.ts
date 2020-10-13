
/**
 * 在上下文注册builder
 */

export default  function(beanId?:string,single?:boolean){
    if(beanId != null)
        beanId = beanId.toLowerCase();
    if(beanId == null)
        beanId = '';
    
    let __needReg = 'multi';
    if(single){
        __needReg = 'single';
    }
    return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
        return class extends constructor {
            static beanId:string = beanId;
            static __needReg:string = __needReg;
                
            
        }
    }
}
import BeanBuilder from '../bean/BeanBuilder'

import BeanConfig from '../bean/BeanConfig'
