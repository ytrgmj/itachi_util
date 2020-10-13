class Parent{
    static beanId ='parent'
    static test (){
        return 1;
    }
}
class Child extends Parent{

}
test('测试父类',function(){
    expect(Child.beanId).toEqual('parent');
    expect(Child.test()).toBe(1);
})