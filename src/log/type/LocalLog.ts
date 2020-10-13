import LogType from './LogType'
import GetLevel from './GetLevel';

var colorMap = {
    red:{begin:'[31m',end:"[m"},
    green:{begin:"[32m",end:"[m"},
    yellow:{begin:"[33m",end:"[m"}
}
export default class LocalLog extends LogType{
    
    print(log: GetLevel, message: Array<any>) {
        var level = log.getLevel();
        var obj = colorMap[level]
        this._printCommond(obj,'begin');
        var array = this._buildMsgArray(log,message)
        console.log.apply(null,array);
        this._printCommond(obj,'end');
    }

    private _buildMsgArray(log: GetLevel,message: Array<any>){
        var first = message[0];
        
        if(first instanceof Error){
            var str =`
${first.message}
${first.stack}
`;          
            message =[str];
        }
        var level = log.getLevel();
        var array = [level,':'].concat(message)
        var other = log.getOther();
        if(other.url)
            array.push(other.url);
        return array;
    }

    private _printCommond(obj:any,key:string){
        if(obj == null)
            return;
        var array = [0o33];
        var str:string = obj[key];
        if(str == null)
            return;
        for(var i=0;i<str.length;i++){
            array.push(str.charCodeAt(i));
        }
        var buffer = Buffer.from(array);
        console.log(buffer.toString());
        

    }
    
}