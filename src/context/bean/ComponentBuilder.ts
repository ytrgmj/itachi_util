import BeanBuilder from './BeanBuilder'

export default class ComponentBuilder implements BeanBuilder{
    _map:any = {};
    add(componentId:string,beanId:string){

        this._map[componentId] = beanId;
        
    }

    build(context: Context) {
        let map = this._map;
        let retMap = new Map();
        retMap['getBeanConfig$$'] = function(){
            let ins = this._beanConfig
            if(ins == null){
                ins = new ComponentBeanConfig(map);
                this._beanConfig = ins;
            }
            return ins;
        }
        
        return retMap;
    }

    afterBuild(){
      
        
    }
    


    
}
import Context from '../Context'
import BeanConfig from './BeanConfig';
import ComponentBeanConfig from './imp/ComponentBeanConfig';
