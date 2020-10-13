import Server from "../Server";
import Context from "../../Context";
import Bean from "../Bean";

class Parent{
    @Bean()
    protected aaa:Aaa;
}
@Server('child',true)
class Child extends Parent{
    constructor(){
        super();
        console.log('*****child constructor*****');
        
    }
    @Bean()
    protected ccc:Ccc;
    test(){
        console.log('child:test');
        this.aaa.test();
        this.ccc.testCcc()       
    }
}
@Server('ccc')
class Ccc{
    testCcc(){
        console.log('cccc:test cc');
        
    }
}

@Server('bbb')
class Bbb{
    constructor(){
        console.log('*****bbbbbb constructor*****');
    }
    test2(){
        console.log('Bbb:test2');
        this.aaa.test()
    }
    @Bean()
    private aaa:Aaa;
}

@Server('aaa')
class Aaa{
    @Bean()
    private bbb:Bbb;
    @Bean()
    private child:Child;
    test(){
        console.log('aaa:llllllllllll');
    }
    test2(){
        this.bbb.test2();
    }
}
var context = new Context();
context.regClazz('Aaa',Aaa);
context.regClazz('Bbb',Bbb);
context.regClazz('child',Child);
context.regClazz('ccc',Ccc);
function run(){
    console.log('//////////////////////////////////');
    
    var child = context.buildChild();
    var bbb = child.get<Bbb>('bbb');
    bbb.test2();
    console.log('========================');
    var aaa = child.get<Aaa>('aaa');
    aaa.test();
    aaa.test2();

    console.log('====================');


    var c = child.get<Child>('child')
    c.test();
}

run();
run();
run();
console.log('finish');