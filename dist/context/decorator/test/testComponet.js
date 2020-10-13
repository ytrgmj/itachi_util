"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = __importDefault(require("../../Context"));
const Bean_1 = __importDefault(require("../Bean"));
class Aaa {
    test() {
        console.log('Aaa');
        this.a111.test();
    }
}
__decorate([
    Bean_1.default()
], Aaa.prototype, "a111", void 0);
class Bbb {
    test() {
        console.log('bbb');
    }
}
class A111 {
    test() {
        console.log('A111:test');
    }
}
class Ccc {
    test(id) {
        this.component[id].test();
    }
}
__decorate([
    Bean_1.default()
], Ccc.prototype, "component", void 0);
var context = new Context_1.default();
context.regComponent('component', Aaa, 'aaa');
context.regComponent('component', Bbb, 'bbb1');
context.regClazz('ccc', Ccc);
context.regClazz('A111', A111);
let childContext = context.buildChild();
let ccc = childContext.get('ccc');
ccc.test('aaa');
console.log('==========');
ccc.test('bbb1');
