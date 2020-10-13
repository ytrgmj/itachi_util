"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasePojo {
    constructor(data) {
        this._data = data;
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    getData() {
        return this._data;
    }
}
exports.default = BasePojo;
