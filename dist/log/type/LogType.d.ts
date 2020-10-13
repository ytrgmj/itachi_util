export default abstract class LogType {
    abstract print(log: GetLevel, array: Array<any>): any;
    protected _parseMsg(list: Array<any>): string;
    protected _stringify(any: any): string;
}
import GetLevel from "./GetLevel";
