declare class JsonUtil {
    /**
    把一个值加到数组中
    
   obj 目标
   keys 设置的key列表
   param 设置值
  */
    static add(obj: any, keys: Array<string>, param: any): any;
    /**
     设置一个值
     obj 目标
     keys 设置的key列表
     param 设置值
    */
    static set(obj: any, keys: Array<string> | string, param: any): any;
    /**
     * 取值
     * @param obj
     * @param keys
     */
    static get(obj: any, keys: string | Array<string>): any;
}
export default JsonUtil;
