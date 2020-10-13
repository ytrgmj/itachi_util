/**
 * 打印日志
 */
interface LoggerOpt {
    context_id?: string | number;
    store_id?: string | number;
    brand_id?: string | number;
    category?: string | number;
    other?: any;
    name?: string;
    url?: string;
}
export default class LogHelp {
    private static envName;
    private static levelMap;
    private static _projectName;
    private _level;
    private _opt;
    constructor(opt?: LoggerOpt);
    getProjectName(): string;
    set(opt: LoggerOpt): LogHelp;
    getLevelMap(): any;
    info(...message: any): void;
    print(list: any): void;
    getLevel(): string;
    getOther(): any;
    private _acqLogType;
    setLevel(level: string): LogHelp;
    setCategory(category: string): LogHelp;
    error(...message: any): void;
    debug(...message: any): void;
    red(...message: any): void;
    green(...message: any): void;
    yellow(...message: any): void;
    /**
     * 创建一个loghelp
     * @param req
     * @param opt
     */
    static buildLogger(req: any, opt?: LoggerOpt): LogHelp;
    static setProjectName(name: string): void;
    static setLevels(array: Array<string>): void;
    static setEnvName(envName: string): void;
}
export {};
