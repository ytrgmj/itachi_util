export class RowUtil {
    private static COLS = [
        "sys_add_time", 
        "sys_modify_time", 
        "context_id",
        "add_user",
        "modify_user",
        "remark",
        "is_del",
        "source",
        "level"
    ];

    /**
     * 简单的对象拷贝
     * @param obj
     */
    private static cpObj (obj: any) {
        const map = new Map(Object.entries(obj));

        let o_new = Object.create(null);
        for (let [k, v] of map) {
            o_new[k] = v;
        }
        return o_new;
    }

    /**
     * 简单的对象数组拷贝
     * @param a_obj
     */
    private static cpArray (a_obj: any[]) {
        const a_new = [];

        for (const obj of a_obj) {
            a_new.push(this.cpObj(obj));
        }

        return a_new;
    }
    /**
     * 删除对象的指定属性,默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param obj   需要处理的对象
     * @param cols  需要删除的字段
     */
    static delCols (obj: any, cols?: string[]) {
        if (cols == null) cols = this.COLS;

        cols.map((s_col) => {
            delete obj[s_col];
        });

        return obj;
    }

    /**
     * 删除数组每个对象的指定属性,默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param a_obj 需要处理的数组
     * @param cols  需要删除的字段
     */
    static delListCols (a_obj: any[], cols?: string[]) {
        if (cols == null) cols = this.COLS;

        for (let obj of a_obj) {
            this.delCols(obj, cols);
        }

        return a_obj;
    }

    /**
     * 拷贝并且删除对象的指定属性(不影响原始数据),默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param obj   需要处理的对象
     * @param cols  需要删除的字段
     */
    static cpDelCols (obj: any, cols?: string[]) {
        const o_cp = this.cpObj(obj);

        return this.delCols(o_cp, cols);
    }

    /**
     * 拷贝并且删除数组每个对象的指定属性(不影响原始数据),默认cols为['sys_add_time', 'sys_modify_time', 'context_id']
     * @param a_obj 需要处理的数组
     * @param cols  需要删除的字段
     */
    static cpDelListCols (a_obj: any[], cols?: string[]) {
        const a_cp = this.cpArray(a_obj);

        return this.delListCols(a_cp, cols);
    }


    /**
     * 返回指定属性
     * @param obj     需要转换的对象
     * @param cols    获取的字段
     */
    static pickCols(obj: any, cols?: string[]) {
        const newObj = {}

        for(const item of cols) {
            if (obj[item] != null) 
                newObj[item] = obj[item]
        }

        return newObj
    }


    static pickListCols(a_obj: any[], cols?: string[]) {
        const a_new = []
        for (const item of a_obj) {
            a_new.push(this.pickCols(item,cols))
        }

        return a_new
    }
}
