import LogHelp from '../../src/log/LogHelp'

test('buildLogger2',function(){
    LogHelp.setEnvName('test');

    let req = {} //测试用，真是环境传 真正req进去

    let logger =new  LogHelp();
    logger.debug('test')
    //logger = LogHelp.buildLogger(req,{store_id:330108});
    logger.debug('test1')

    
})