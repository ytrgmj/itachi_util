import Context from '../context/Context';
export default class TimezoneServer {
    private _context;
    private _timezone;
    setContext(context: Context): void;
    getContext(): Context;
    setTimezone(timezone: string): void;
    getDate(date?: any): Date;
    onlyDay(): Date;
    sysToTzDate(timezone: string, sysDate?: Date): Date;
    tzToSysDate(date: Date, timezone?: string): Date;
    /**
     * 由于存的都是时区别名，做一层转换。
     */
    _parseTimezone(timezone: any): any;
}
