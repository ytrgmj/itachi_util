import Server from "../Server";
import Context from "../../Context";
import Bean from "../Bean";

class Aaa{
    @Bean()
    private a111:A111;

    test(){
        console.log('Aaa');
        
        this.a111.test();
    }
}

class Bbb{
    test(){
        console.log('bbb');
    }
}
class A111{
    test(){
        console.log('A111:test');
        
    }
}

class Ccc{
    @Bean()
    private component:any;
    test(id){
        
        this.component[id].test();
    }
}
var context = new Context();
context.regComponent('component',Aaa,'aaa');
context.regComponent('component',Bbb,'bbb1');
context.regClazz('ccc',Ccc);
context.regClazz('A111',A111);
let childContext = context.buildChild();
let ccc:Ccc = childContext.get('ccc');
ccc.test('aaa');
console.log('==========');
ccc.test('bbb1')


