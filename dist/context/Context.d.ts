import BeanBuilder from "./bean/BeanBuilder";
import LogHelp from "../log/LogHelp";
/**
 * bean 上下午相关的结构
 * {
 *  __need:['beanId1','beanId2']
 * }
 * 上下文类
 */
export default class Context {
    private _componentId;
    private _afterBuildChildFuns;
    /**
     * 夫节点
     */
    private _parent;
    private _initLog;
    /**
     * 放bean缓存
     */
    private _map;
    private _data;
    /**
     * builder 的缓存
     */
    private _builderMap;
    private _logger;
    private _id;
    constructor();
    addAfterBuildChildFun(fun: Function): void;
    /**
     *
     * @param componentId 组件容器的id
     * @param clazz
     * @param beanId
     */
    regComponent(componentId: string, clazz: any, beanId?: string, key?: string): void;
    setData(key: string, val: any): Context;
    getData(key: string): any;
    /**
     * 构建一个对象
     * @param beanId
     */
    private getBuilder;
    buildChild(): Context;
    private _parseBeanId;
    get<T>(beanId: string): T;
    private _reg;
    /**
     * 找到build，并且在map中存放
     * 返回没有注册的依赖类
     */
    private _doReg;
    /**
     * 查询没有注册的又需要依赖的id
     * @param beanIdList
     */
    private _findNoRegNeed;
    private _buildAndSave;
    /**
     * 装配
     * @param beans
     */
    assembly(beans: Array<any>): void;
    /**
     * 装配属性
     * @param beans
     */
    private _assembly;
    /**
     * 注册父类的builder
     */
    regParentBuilder(beanId: string, builder: BeanBuilder): void;
    regParentBuilderByClazz(beanId: string, clazz: any): void;
    regBuilder(beanId: string, builder: BeanBuilder): void;
    regClazz(beanId: string, clazz: any, single?: boolean): void;
    /**
     * 合并两个context
     * @param context
     */
    combine(context: Context): Context;
    /**
     * 返回日志处理器
     */
    getLogger(category?: string): LogHelp;
    getId(): number;
    setId(context_id: number): number;
    initLog(logConf: any): void;
}
