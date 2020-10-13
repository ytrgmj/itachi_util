import Context from "../context/Context";
import { GetClazz } from "../util";

export default abstract class BaseDomain{
    _context:Context;

    abstract getPojoClazz():any;

    protected _needAssembly():boolean{
        return false;
    }
    parsePojo(data){
        let clazz = this.getPojoClazz();
        let ret = new clazz(data);
        var context = this.getContext();
        if(context != null){
            if(ret.setContext){
                ret.setContext(context)
            }
            if(this._needAssembly()){
                context.assembly([ret]);
            }
        } 
        return ret;
    }

    parsePojoList(list:object[]):object[]{
        if(list == null){
            return null;
        }
        var array = [];
        for(let data of list){
            array.push(this.parsePojo(data))
        }
        return array;
    }

    
    setContext(context:Context){
        this._context = context;
    }
    getContext():Context{
        return this._context;
    }
}