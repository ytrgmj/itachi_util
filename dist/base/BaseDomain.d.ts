import Context from "../context/Context";
export default abstract class BaseDomain {
    _context: Context;
    abstract getPojoClazz(): any;
    protected _needAssembly(): boolean;
    parsePojo(data: any): any;
    parsePojoList(list: object[]): object[];
    setContext(context: Context): void;
    getContext(): Context;
}
