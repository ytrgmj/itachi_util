import LogType from './LogType';
import GetLevel from './GetLevel';
export default class LocalLog extends LogType {
    print(log: GetLevel, message: Array<any>): void;
    private _buildMsgArray;
    private _printCommond;
}
