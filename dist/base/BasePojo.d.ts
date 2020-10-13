import Context from '../context/Context';
export default class BasePojo {
    _data: any;
    _context: Context;
    constructor(data: any);
    setContext(context: Context): void;
    getContext(): Context;
    getData(): any;
}
