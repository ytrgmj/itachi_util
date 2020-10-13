"use strict";
/**
 * 打印日志
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
class LogHelp {
    constructor(opt) {
        if (opt != null)
            this._opt = opt;
        else
            this._opt = {};
        if (this._opt.context_id == null) {
            let now = new Date().getTime();
            let random = Math.floor(Math.random() * 1000);
            this._opt.context_id = now * 1000 + random;
        }
    }
    getProjectName() {
        return LogHelp._projectName;
    }
    set(opt) {
        if (this._opt == null)
            this._opt = {};
        if (opt != null) {
            for (var e in opt) {
                this._opt[e] = opt[e];
            }
        }
        return this;
    }
    getLevelMap() {
        return LogHelp.levelMap;
    }
    info(...message) {
        this.setLevel('INFO').print(message);
    }
    print(list) {
        var logtype = this._acqLogType();
        logtype.print(this, list);
    }
    getLevel() {
        return this._level;
    }
    getOther() {
        var result = {};
        var opt = this._opt;
        for (var e in opt) {
            result[e] = opt[e];
        }
        if (result['other'])
            result['other'] = JSON.stringify(result['other']);
        result['level'] = this._level;
        return result;
    }
    _acqLogType() {
        if (LogHelp.envName == 'local' || LogHelp.envName == null)
            return new LocalLog_1.default();
        return new DefaultLog_1.default();
    }
    setLevel(level) {
        this._level = level;
        return this;
    }
    setCategory(category) {
        this._opt.category = category;
        return this;
    }
    error(...message) {
        this.setLevel('ERROR').print(message);
    }
    debug(...message) {
        this.setLevel('DEBUG').print(message);
    }
    red(...message) {
        this.setLevel('red').print(message);
    }
    green(...message) {
        this.setLevel('green').print(message);
    }
    yellow(...message) {
        this.setLevel('yellow').print(message);
    }
    /**
     * 创建一个loghelp
     * @param req
     * @param opt
     */
    static buildLogger(req, opt) {
        if (opt == null)
            opt = {};
        let headers = req.headers;
        if (headers != null && headers.contextId != null) {
            req._context_id = headers.contextId;
        }
        if (req._context_id == null) {
            let now = new Date().getTime();
            let random = Math.floor(Math.random() * 1000);
            let _id = now * 1000 + random;
            req._context_id = _id;
        }
        opt.context_id = req._context_id;
        return new LogHelp(opt);
    }
    static setProjectName(name) {
        LogHelp._projectName = name;
    }
    static setLevels(array) {
        if (array != null) {
            var obj = {};
            for (var key of array) {
                obj[key.toLowerCase()] = true;
            }
            LogHelp.levelMap = obj;
        }
    }
    static setEnvName(envName) {
        LogHelp.envName = envName;
    }
}
exports.default = LogHelp;
const DefaultLog_1 = __importDefault(require("./type/DefaultLog"));
const LocalLog_1 = __importDefault(require("./type/LocalLog"));
