import Context from '../../../src/context/Context'
import BeanConfig from '../../../src/context/bean/BeanConfig'
import Bean from '../../../src/context/bean/BeanConfig';

it('测试builder',function(){
    let conext = new Context();
    conext.regBuilder('aaa',{
        build(){
            return {
                aaa:123,
                __beanConfig:new BeanConfig({
                    bbb:'bbb',
                    ccc:'ddd'
                })
            }
        }
    
    })
    conext.regBuilder('bbb',{
        build(){
            return {
                bbb:456,
                __beanConfig:new BeanConfig({
                    ddd:'ddd'
                })
            }
            

        }
    });
    conext.regBuilder('ddd',{
        build(){
            return {
                ddd:7,
                __beanConfig:new BeanConfig({
                    ddd1:'ddd',
                    bbb:'bbb'
                })

            }
        },
        
    });

    conext.regBuilder('eee',{
        build(){
            return {
                eee:8,
                __beanConfig:new BeanConfig({
                    ddd:'ddd'
                })

            }
        },
        
    });

    let child = conext.buildChild();
    let aaa = child.get('aaa');
   
    expect(aaa['bbb'].bbb).toBe(456)
    expect(aaa['ccc'].ddd).toBe(7)
    var bbb = child.get('bbb')
    
    expect(bbb['ddd'].ddd).toBe(7)
    var ddd = child.get('ddd');
    expect(ddd['ddd']).toBe(7);
    expect(ddd['ddd1'].ddd).toBe(7);
    expect(ddd['bbb'].bbb).toBe(456);
    console.log('=======================');
    var eee = child.get('eee');
    expect(eee['ddd'].ddd).toBe(7)

})