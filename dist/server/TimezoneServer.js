"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TimezoneUtil_1 = require("../util/TimezoneUtil");
class TimezoneServer {
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    setTimezone(timezone) {
        this._timezone = timezone;
    }
    getDate(date) {
        const tmpCtx = this.getContext();
        if (date == null && tmpCtx.getData('now') != null) {
            return tmpCtx.getData('now');
        }
        let timezone = this._timezone;
        if (timezone == null)
            timezone = tmpCtx.getData('timezone');
        return this.sysToTzDate(timezone, date);
    }
    onlyDay() {
        let date = this.getDate();
        let ret = new Date();
        ret.setTime(date.getTime());
        ret.setHours(0);
        ret.setMinutes(0);
        ret.setSeconds(0);
        ret.setMilliseconds(0);
        return ret;
    }
    //系统转某个时区
    sysToTzDate(timezone, sysDate) {
        if (timezone == null) {
            timezone = 'Asia/Shanghai';
        }
        if (sysDate == null) {
            sysDate = new Date();
        }
        const sysOffset = sysDate.getTimezoneOffset();
        timezone = this._parseTimezone(timezone);
        return new Date(sysDate.getTime() + (sysOffset + TimezoneUtil_1.getUtcOffset(timezone, sysDate.getTime())) * 60000);
    }
    //某个时区转系统
    tzToSysDate(date, timezone) {
        if (timezone == null) {
            const tmpCtx = this.getContext();
            timezone = tmpCtx.getData('timezone');
        }
        const now = new Date();
        const sysOffset = now.getTimezoneOffset();
        timezone = this._parseTimezone(timezone);
        return new Date(date.getTime() - (sysOffset + TimezoneUtil_1.getUtcOffset(timezone, date.getTime())) * 60000);
    }
    /**
     * 由于存的都是时区别名，做一层转换。
     */
    _parseTimezone(timezone) {
        const map = {
            'Eastern Time Zone': "America/New_York",
            'Central Time Zone': "America/Chicago",
            'Mountain Time Zone': "America/Denver",
            'Mountain Time Zone - Arizona': "America/Phoenix",
            'Pacific Time Zone': "America/Los_Angeles",
            'Alaska Time Zone': "America/Anchorage",
            'Hawaii-Aleutian Time Zone': "Pacific/Honolulu"
        };
        const val = map[timezone];
        return val || timezone;
    }
}
exports.default = TimezoneServer;
