import BeanBuilder from "./bean/BeanBuilder";
import BeanConfig from "./bean/BeanConfig";
import LogHelp from "../log/LogHelp";

import ComponentBuilder from "./bean/ComponentBuilder";

const AfterBuild = 'afterBuild' //后处理函数
/**
 * bean 上下午相关的结构
 * {
 *  __need:['beanId1','beanId2']
 * }
 * 上下文类
 */
export default class Context{
    private _componentId:number=0;

    /**
     * 夫节点
     */
    private _parent:Context;
    private _initLog:boolean = false;
    /**
     * 放bean缓存
     */
    private _map = {};
    private _data = {}
    /**
     * builder 的缓存
     */
    private _builderMap = {};

    private _logger:LogHelp;

    private _id:number;


    constructor(){
        
    }

    /**
     * 
     * @param componentId 组件容器的id
     * @param clazz 
     * @param beanId 
     */
    regComponent(componentId:string,clazz,beanId?:string,key?:string){
        if(beanId == null){
            beanId = 'comp_'+(this._componentId++);
        }
        if(key == null)
            key = beanId
        beanId = this._parseBeanId(beanId)
        
        this.regClazz(beanId,clazz);
        let cb:ComponentBuilder = this._builderMap[componentId];
        if(cb == null){
            cb = new ComponentBuilder();
            this.regBuilder(componentId,cb)
        }
        cb.add(key,beanId);

    }

    

    setData(key:string,val:any):Context{
        this._data[key] = val;
        return this;
    }

    getData(key:string):any{
        return this._data[key];
    }
    /**
     * 构建一个对象
     * @param beanId 
     */
    private getBuilder(beanId:string):BeanBuilder{
        return this._builderMap[beanId];
    }

    buildChild():Context{
        let context = new Context();
        context._parent = this;
        return context;
    }

    private _parseBeanId(beanId:string){
        beanId = beanId.toLowerCase()
        if(beanId.indexOf('_')!=-1){
            var strs = beanId.split('_');
            beanId = strs.join('')
        }
        return beanId;
    }

    get<T>(beanId:string):T{
        if(beanId != null)
            beanId = this._parseBeanId(beanId);
        var map = this._map;
        let bean = map[beanId];
        if(bean != null){
            return bean ;
        }
        
        return this._reg(beanId);
    }

    private _reg(beanId:string):any{
        //查询各类依赖
        let beanList = this._doReg([beanId]);
        this._assembly(beanList);
        return this._map[beanId];
    }
    /**
     * 找到build，并且在map中存放
     * 返回没有注册的依赖类
     */
    private _doReg(beanIdList:Array<string>):Array<any>{
        let list = [];
        while(beanIdList.length>0){
            for(let beanId of beanIdList){
                list.push(this._buildAndSave(beanId))
            }
            beanIdList = this._findNoRegNeed(beanIdList);
        }
        return list;
    }
    /**
     * 查询没有注册的又需要依赖的id
     * @param beanIdList 
     */
    private _findNoRegNeed(beanIdList:Array<string>):Array<string>{
        let map = this._map;
        let retMap = {};
        var list = [];
        for(let beanId of beanIdList){
            var bean = this._map[beanId];
            if(bean  != null && bean.getBeanConfig$$){
                var beanConfig:BeanConfig = bean.getBeanConfig$$();
                let needs:Array<string> = beanConfig.getNeeds();
                for(let needbeanId of needs){
                    if(map[needbeanId] == null){
                        retMap[needbeanId] = true;
                    }
                }
            }
        }
        for(var id in retMap){
            list.push(id);
        }
        return list;
    }

    private _buildAndSave(beanId:string):any{
        let parent = this._parent;
        if(parent == null){
            throw new Error('父类的context为空，必须从父类buildChild出来了');
        }
        var builder = parent.getBuilder(beanId);
        if(builder == null){
            var msg =(`${beanId}没有注册构造器`);
            throw new Error(msg);
        }
        var bean = builder.build(this);
        if(bean == null){
            var msg = `${beanId}的构造器没有构造出实例`
            throw new Error(msg);
        }
        if(bean.getBeanConfig$$ == null){
            if(bean.__beanConfig != null){
                bean.getBeanConfig$$ = function(){
                    return this.__beanConfig;
                }
            }else{   
                let beanConfig = new BeanConfig(); 
                
                bean.getBeanConfig$$ = function(){
                    return beanConfig;
                }
            }
        }
        this._map[beanId] = bean;
        return bean;
    }


    /**
     * 装配
     * @param beans 
     */
    assembly(beans:Array<any>){
        var map = {};
        //得到所有的依赖列表
        for(let bean of beans){
            if(bean.getBeanConfig$$){
                let beanConfig:BeanConfig = bean.getBeanConfig$$();
                let needsMap = beanConfig.getNeedsMap();
                for(let beanId in needsMap){
                    map[beanId] = true;
                }
            }
        }
        for(var e in map){
            this.get(e); //保证依赖包都在缓存中
        }
        this._assembly(beans);
    }
    /**
     * 装配属性
     * @param beans 
     */
    private _assembly(beans:Array<any>){
        let map = this._map;
        for(let bean of beans){
            if(bean.getBeanConfig$$ != null){
                let beanConfig:BeanConfig = bean.getBeanConfig$$();
                if(beanConfig.isAssembly()){
                    continue;
                }
                let needsMap = beanConfig.getNeedsMap();
                for(let beanId in needsMap){
                    beanConfig.assembly(bean,beanId,map[needsMap[beanId]]);
                }
                if(bean[AfterBuild]){ //执行创建后操作
                    bean[AfterBuild](this);
                }
                beanConfig.setAssembly(true);
            }
        }
    }

    /**
     * 注册父类的builder
     */
    regParentBuilder(beanId:string,builder:BeanBuilder){
        if(this._parent == null){
            throw new Error('父context不存在');
        }
        return this._parent.regBuilder(beanId,builder)
    }

    regParentBuilderByClazz(beanId:string,clazz){
        if(this._parent == null){
            throw new Error('父context不存在');
        }
        this.regParentBuilder(beanId,{
            build(context){
                var ins = new clazz();
                if(ins.setContext)
                    ins.setContext(context);
                return ins;
            }
        })
    }

    regBuilder(beanId:string,builder:BeanBuilder){
        if(beanId != null)
            beanId = this._parseBeanId(beanId);
        this._builderMap[beanId] = builder;
    }

    regClazz(beanId:string,clazz){
        
        if(clazz.__needReg =='single'){
            this.regBuilder(beanId,{
                build(context:Context){
                    if(this._ins == null){
                        this._ins = new clazz();
                    }
                    return this._ins 
                }
            })
        }else{
            this.regBuilder(beanId,{
                build(context:Context){
                    var ins = new clazz();
                    if(ins.setContext)
                        ins.setContext(context);
                    return ins;
                }
            })
        }
            
        
    }
    /**
     * 合并两个context
     * @param context 
     */
    combine(context:Context):Context{
        var map = context._builderMap;
        var builderMap = this._builderMap;
        for(var e in map){
            builderMap[e] = map[e];
        }
        return this;
    }
    /**
     * 返回日志处理器
     */
    getLogger(category?:string):LogHelp{
        if(category == null)
            category = 'server';
        
        if(this._logger == null){
            this._logger = new LogHelp();
            this._logger.set({context_id:this.getId()})
        }
        this._logger.set({category})
        return this._logger;
    }

    getId():number{
        if(this._id == null){
            let now = new Date().getTime();
            let random =  Math.floor(Math.random() * 1000);
            this._id = now*1000 + random;
        }
        return this._id;
    }

    setId(context_id:number):number{
        this._id = context_id
        return this._id
    }

    initLog(logConf){
        if(this._initLog) 
            return
        this._initLog = true;
        if(logConf){
            if(logConf.envName)
                LogHelp.setEnvName(logConf.envName);
            if(logConf.levels)
                LogHelp.setLevels(logConf.levels)
            if(logConf.projectName)
                LogHelp.setProjectName(logConf.projectName)
        }
        
    }
}
/**
 * 日志配置
 */
const LOGCONF = 'logConf'