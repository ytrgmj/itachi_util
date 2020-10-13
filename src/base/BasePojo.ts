import Context from '../context/Context'

export default class BasePojo {
    _data:any;
    _context:Context;
    constructor(data){
        this._data = data;
    }

    setContext(context:Context){
        this._context = context;
    }
    getContext(){
        return this._context;
    }
    getData(){
        return this._data;
    }

    
}