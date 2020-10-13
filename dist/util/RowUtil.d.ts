export declare class RowUtil {
    private static COLS;
    /**
     * 简单的对象拷贝
     * @param obj
     */
    private static cpObj;
    /**
     * 简单的对象数组拷贝
     * @param a_obj
     */
    private static cpArray;
    /**
     * 删除对象的指定属性,默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param obj   需要处理的对象
     * @param cols  需要删除的字段
     */
    static delCols(obj: any, cols?: string[]): any;
    /**
     * 删除数组每个对象的指定属性,默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param a_obj 需要处理的数组
     * @param cols  需要删除的字段
     */
    static delListCols(a_obj: any[], cols?: string[]): any[];
    /**
     * 拷贝并且删除对象的指定属性(不影响原始数据),默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param obj   需要处理的对象
     * @param cols  需要删除的字段
     */
    static cpDelCols(obj: any, cols?: string[]): any;
    /**
     * 拷贝并且删除数组每个对象的指定属性(不影响原始数据),默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param a_obj 需要处理的数组
     * @param cols  需要删除的字段
     */
    static cpDelListCols(a_obj: any[], cols?: string[]): any[];
    /**
     * 返回指定属性
     * @param obj     需要转换的对象
     * @param cols    获取的字段
     */
    static pickCols(obj: any, cols?: string[]): {};
    static pickListCols(a_obj: any[], cols?: string[]): any[];
}
