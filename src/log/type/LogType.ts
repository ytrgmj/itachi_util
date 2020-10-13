


export default abstract class LogType{
    abstract print(log:GetLevel,array:Array<any>);

    protected _parseMsg(list:Array<any>):string{
        
        let message:string;
        if(list.length == 1){
            if(!(typeof(list[0])=='string')){
                message = this._stringify(list[0])
            }else{
                message = <string>list[0];
            }
        }else{
            message = this._stringify(list);
        }
        return message;
    }

    protected _stringify(any):string{
        var ret = null;
        try{
            ret = JSON.stringify(any);
        }catch(e){
            console.log(e);
        }
        return ret;

    }
}
import GetLevel from "./GetLevel";


