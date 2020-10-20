# itachi_util
itachi_util 提供了itachi系列核心的类。
主要是context、log

## context的使用
context是一个工厂类，可以将类注册到context中并装配起来，以供其他类使用。
### 显式装配
显式装配是直接通过代码进行装配。
``` typescript
let context = new Context();
context.regClazz(beanId,clazz,true); //注册类，第三个参数可选，表示这个类是否单例
let childContext = context.buildChild(); //构建一个子的context
```

### 显示读取
### 隐士装配