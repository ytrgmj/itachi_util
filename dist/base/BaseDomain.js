"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseDomain {
    _needAssembly() {
        return false;
    }
    parsePojo(data) {
        let clazz = this.getPojoClazz();
        let ret = new clazz(data);
        var context = this.getContext();
        if (context != null) {
            if (ret.setContext) {
                ret.setContext(context);
            }
            if (this._needAssembly()) {
                context.assembly([ret]);
            }
        }
        return ret;
    }
    parsePojoList(list) {
        if (list == null) {
            return null;
        }
        var array = [];
        for (let data of list) {
            array.push(this.parsePojo(data));
        }
        return array;
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
}
exports.default = BaseDomain;
