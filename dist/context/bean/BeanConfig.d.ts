export default class BeanConfig {
    private _assmblied;
    private _map;
    private funNameOfSet;
    constructor(map?: any);
    assembly(bean: any, beanId: any, pro: any): void;
    getFunNameOfSet(): string;
    /**
     * 是否装配完成
     */
    isAssembly(): boolean;
    /**
     * 设置是否装配完成
     * @param val
     */
    setAssembly(val: boolean): void;
    /**
     * 返回需要的依赖beanId
     */
    getNeedsMap(): any;
    /**
     * 返回依赖列表
     */
    getNeeds(): any[];
    /**
     * 设置依赖
     * @param propertyKey
     * @param beanId
     */
    add(propertyName: string, beanId: string): void;
    static addProperty(target: any, propertyName: string, beanId: string): void;
    private static addBeanConfigFun;
}
