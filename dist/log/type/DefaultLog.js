"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogType_1 = __importDefault(require("./LogType"));
class DefaultLog extends LogType_1.default {
    print(log, list) {
        if (list == null || list.length == 0)
            return;
        var levelMap = log.getLevelMap();
        var level = log.getLevel();
        if (level == null || levelMap == null || levelMap[level.toLowerCase()]) {
            var otherOpt = log.getOther();
            var first = list[0];
            if (!(first instanceof Error)) {
                otherOpt.message = this._parseMsg(list);
            }
            else {
                otherOpt.message = first.message;
                otherOpt.stack = first.stack;
            }
            otherOpt.timestamp = new Date().getTime();
            console.log(this._stringify(otherOpt));
        }
    }
}
exports.default = DefaultLog;
