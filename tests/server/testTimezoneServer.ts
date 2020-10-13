import Context from "../../src/context/Context"
import TimeZoneServer from '../../src/server/TimezoneServer';
test('测试timezone server(按本机utc8测试才能通过)',function(){
  let context = new Context();
  const timezoneServer = new TimeZoneServer(); 
  context.setData('timezone','Asia/Dili')
  timezoneServer.setContext(context);
  //+09:00
  const date = new Date();
  expect(timezoneServer.getDate().getTime()).toBeGreaterThanOrEqual(Date.now())
  expect(timezoneServer.getDate().getTime()).toBeLessThanOrEqual((Date.now()+60*1000*60))
  expect(timezoneServer.sysToTzDate('Asia/Dili',date).getTime()).toEqual((date.getTime()+60*1000*60))
  expect(timezoneServer.tzToSysDate(date,'Asia/Dili').getTime()).toEqual(date.getTime()-60*60*1000)
  //+07:00
  context.setData('timezone','Asia/Omsk')
  expect(timezoneServer.getDate().getTime()).toBeLessThan(Date.now())
  expect(timezoneServer.getDate().getTime()).toBeGreaterThanOrEqual((Date.now()-120*1000*60))
  expect(timezoneServer.sysToTzDate('Asia/Omsk',date).getTime()).toEqual((date.getTime()-120*1000*60))
  expect(timezoneServer.tzToSysDate(date,'Asia/Omsk').getTime()).toEqual(date.getTime()+120*60*1000)
})