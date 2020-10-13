import LogHelp from '../../src/log/LogHelp'

test('buildLogger',function(){
    LogHelp.setEnvName('test');

    let req = {} //测试用，真是环境传 真正req进去

    let logger = LogHelp.buildLogger(req,{store_id:330108});
    logger.debug('test')
    logger.debug('test1')

    LogHelp.buildLogger(req,{store_id:330109}).info('ddd');
})