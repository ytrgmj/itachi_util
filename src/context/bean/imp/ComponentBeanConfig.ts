import BeanConfig from '../BeanConfig'
export default class ComponentBeanConfig extends BeanConfig{
    assembly(bean,beanId,pro){
        bean.set(beanId,pro)
    }
}