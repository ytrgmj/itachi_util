import Context from '../../src/context/Context'
it('测试context',function(){
    let id = 0;
    let context = new Context();
    context.regBuilder('aaa',{
        build(){
            return {
                aaa:123,
                id:id++
            }
        }
    });
    
    let child = context.buildChild();
    let bean = child.get('aaa');
    expect(bean['aaa']).toBe(123)
    expect(bean['id']).toBe(0)

    let bean1 = child.get('aaa');
    expect(bean1['aaa']).toBe(123)
    expect(bean1['id']).toBe(0)
});