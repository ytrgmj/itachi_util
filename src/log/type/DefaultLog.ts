
import LogType from "./LogType";
export default class DefaultLog extends LogType{
    print(log: GetLevel, list: Array<any>) {
        if(list == null || list.length == 0) 
            return ;
        var levelMap = log.getLevelMap();
        var level = log.getLevel();
        
        if(level == null || levelMap == null || levelMap[level.toLowerCase()]){
            var otherOpt = log.getOther()

            var first = list[0];
            if(!(first instanceof Error)){
                otherOpt.message = this._parseMsg(list);
            }else{
                otherOpt.message = first.message;
                otherOpt.stack = first.stack;
            }
            otherOpt.timestamp = new Date().getTime();
            console.log(this._stringify(otherOpt));
        }
    }
    
}

import GetLevel from "./GetLevel";

