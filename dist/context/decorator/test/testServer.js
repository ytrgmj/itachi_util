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
const Server_1 = __importDefault(require("../Server"));
const Context_1 = __importDefault(require("../../Context"));
const Bean_1 = __importDefault(require("../Bean"));
class Parent {
}
__decorate([
    Bean_1.default()
], Parent.prototype, "aaa", void 0);
let Child = class Child extends Parent {
    constructor() {
        super();
        console.log('*****child constructor*****');
    }
    test() {
        console.log('child:test');
        this.aaa.test();
        this.ccc.testCcc();
    }
};
__decorate([
    Bean_1.default()
], Child.prototype, "ccc", void 0);
Child = __decorate([
    Server_1.default('child', true)
], Child);
let Ccc = class Ccc {
    testCcc() {
        console.log('cccc:test cc');
    }
};
Ccc = __decorate([
    Server_1.default('ccc')
], Ccc);
let Bbb = class Bbb {
    constructor() {
        console.log('*****bbbbbb constructor*****');
    }
    test2() {
        console.log('Bbb:test2');
        this.aaa.test();
    }
};
__decorate([
    Bean_1.default()
], Bbb.prototype, "aaa", void 0);
Bbb = __decorate([
    Server_1.default('bbb')
], Bbb);
let Aaa = class Aaa {
    test() {
        console.log('aaa:llllllllllll');
    }
    test2() {
        this.bbb.test2();
    }
};
__decorate([
    Bean_1.default()
], Aaa.prototype, "bbb", void 0);
__decorate([
    Bean_1.default()
], Aaa.prototype, "child", void 0);
Aaa = __decorate([
    Server_1.default('aaa')
], Aaa);
var context = new Context_1.default();
context.regClazz('Aaa', Aaa);
context.regClazz('Bbb', Bbb);
context.regClazz('child', Child);
context.regClazz('ccc', Ccc);
function run() {
    console.log('//////////////////////////////////');
    var child = context.buildChild();
    var bbb = child.get('bbb');
    bbb.test2();
    console.log('========================');
    var aaa = child.get('aaa');
    aaa.test();
    aaa.test2();
    console.log('====================');
    var c = child.get('child');
    c.test();
}
run();
run();
run();
console.log('finish');
