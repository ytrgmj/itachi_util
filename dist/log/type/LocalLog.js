"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogType_1 = __importDefault(require("./LogType"));
var colorMap = {
    red: { begin: '[31m', end: "[m" },
    green: { begin: "[32m", end: "[m" },
    yellow: { begin: "[33m", end: "[m" }
};
class LocalLog extends LogType_1.default {
    print(log, message) {
        var level = log.getLevel();
        var obj = colorMap[level];
        this._printCommond(obj, 'begin');
        var array = this._buildMsgArray(log, message);
        console.log.apply(null, array);
        this._printCommond(obj, 'end');
    }
    _buildMsgArray(log, message) {
        var first = message[0];
        if (first instanceof Error) {
            var str = `
${first.message}
${first.stack}
`;
            message = [str];
        }
        var level = log.getLevel();
        var array = [level, ':'].concat(message);
        var other = log.getOther();
        if (other.url)
            array.push(other.url);
        return array;
    }
    _printCommond(obj, key) {
        if (obj == null)
            return;
        var array = [0o33];
        var str = obj[key];
        if (str == null)
            return;
        for (var i = 0; i < str.length; i++) {
            array.push(str.charCodeAt(i));
        }
        var buffer = Buffer.from(array);
        console.log(buffer.toString());
    }
}
exports.default = LocalLog;
