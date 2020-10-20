# itachi_util
itachi_util 提供了itachi系列核心的类。
主要是context、log

## context的使用
context是一个工厂类，可以将类注册到context中并装配起来，以供其他类使用。
### 显式装配
显式装配是直接通过代码进行装配。
``` typescript
let context = new Context();
context.regClazz('UserDomain',UserDomain,true); //注册类，第三个参数可选，表示这个类是否单例
let childContext = context.buildChild(); //构建一个子的context
let bean:UserDomain = childContext.get('UserDomain'); //从context获取对象 
```
### 注册构造器
除了直接注册类，还可以注册一个构造器builder
``` typescript
context.regBuilder(srcInfo.name,{
    build(){
        return json;
    }
})
```
### 显式读取
显示读取是通过beanId进行读取。注意，context中的beanId是大小写不敏感的，所有的“_”都会被替换，下面三句代码读出来都是同一个类
``` typescript
//context 里面的是beanid是userdomain
let bean:UserDomain = context.get('UserDomain'); //userdomain
let bean:UserDomain = context.get('userdomain'); //userdomain
let bean:UserDomain = context.get('user_domain'); //userdomain

```
### 隐式装配和隐式读取
通过装饰器Server和Bean进行注册和装配。
可以在Server中指定注册到context中的beanId和是否单例。默认是文件名称和非单例。
可以在Bean里面指定从context中读取beanId ，默认的话就以属性名称作为beanId。
``` typescript
@Server()
//@Server('ProductDomain',ture)
export default class ProductMenuDomain extends BaseDomain {
    @Bean() //从context读取productmenudao 的实例
    private productMenuDao: ProductMenuDao
    @Bean('')
    private productMenuSearcher: ProductMenuSearcher;
    @Bean()
    private timezoneServer: TimezoneServer;
}
```
### context和childContext
在context中注册了bean的class或者builder以后，并不能直接从context中取得。必须在ChildContext中读取类。
``` typescript
let context = new Context();
context.regClazz('UserDomain',UserDomain,true); //注册类，第三个参数可选，表示这个类是否单例
let childContext = context.buildChild(); //构建一个子的context
//let bean:UserDomain = conext.get('UserDomain'); //出错
let bean:UserDomain = childContext.get('UserDomain'); //从context获取对象 
```
context在系统中是只有一个实例，而childContext的生命周期对应了每个request。每个request会可以创建一个childContext。
### 类的单例和非单例
一个类如果在Server中指定了是单例，或者在注册regClazz中，指定是单例。那么不同的ChildContext只会创建出一个实例。
如果不是单例。不同的ChildContext会创建不同的实例，但是一个ChildContext一个beanId也只会有一个实例。
单例的代码如下
``` typescript
//server注册
@Server('userDomain',true)
//代码注册
context.regClazz('userDomain',UserDomain,true);
```

### setContext 和 afterBuild
在一个实例被创建以后，如果有setContext ，这个方法会被运行起来。setContext一般用来设置bean的context属性。
``` typescript
abstract class BaseDomain{
    _context:Context;
    setContext(context:Context){ //有了这个方法以后，domain 就可以拿到childContext 对象。
        this._context = context;
    }
```

当一个bean被装配完成以后，就会执行afterBuild函数。
``` typescript
//searcher的afterBuild函数。
afterBuild(context:Context){
        
    this.reg('getById',new Inquiry({
        col:this.getIdKey()
    }));

    
    this.init(context);
    
    var map = this._map;
    for(var e in map){
        let inquiry:BaseInquiry = map[e];
        inquiry.setKey(this.getKey()); 
        inquiry.setContext(this._context);
    }
}
```

## LogHelp
### 使用初始化
以下代码是项目启动的时候调用一次
``` typescript
LogHelp.setEnvName(commonJson.ENV_NAME) //设置环境 ，如果local 会导致打印策略不一样
LogHelp.setLevels(commonJson.Levels) //设置 输出到日志的级别 ['debug','error','level']
```
### 打印日志
``` typescript
let logger = context.getLogger('server'); //推荐写法，从context中读取logger，并将contextId 记录到日志中
let logger = Logger.buildLogger(req);//从request中构建logger，会将contextid构建起来放到request
let logger = new LogHelp(); //不推荐写法 没有contextId

logger.info('path',req.path); //打印level为info的日志 支持打印多个参数
 
logger.debug('path',req.path); //打印level为debug的日志 支持打印多个参数，如果一开始设置的日志级别没有debug，将不会打印出来
```

### contextId机制
contextId 表示一次请求，一个contextId对应一个request一个context。通过contextId，我们可以追踪所有的这次请求的日志。
建议使用以下代码构建日志

``` typescript
let logger = context.getLogger('server'); //推荐写法，从context中读取logger，并将contextId 记录到日志中
```
