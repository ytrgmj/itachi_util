import { RowUtil } from "../../../src/util";

describe("RowUtil test", () => {
    it("cpDelCols", () => {
        const o_mock = {
            sys_add_time: 1,
            sys_modify_time: 1,
            a: 1,
        };
        const o_ret = RowUtil.cpDelCols(o_mock);

        expect(o_mock).toEqual({
            sys_add_time: 1,
            sys_modify_time: 1,
            a: 1,
        });

        expect(o_ret).toEqual({
            a: 1,
        });
    });

    it("cpDelListCols", () => {
        const a_mock = [
            {
                sys_add_time: 1,
                sys_modify_time: 1,
                a: 1,
            },
            {
                sys_add_time: 2,
                sys_modify_time: 2,
                a: 2,
            },
        ];
        const a_ret = RowUtil.cpDelListCols(a_mock);

        expect(a_mock).toEqual([
            {
                sys_add_time: 1,
                sys_modify_time: 1,
                a: 1,
            },
            {
                sys_add_time: 2,
                sys_modify_time: 2,
                a: 2,
            },
        ]);

        expect(a_ret).toEqual([
            {
                a: 1,
            },
            {
                a: 2,
            },
        ]);
    });

    it("delCols", () => {
        const o_mock = {
            sys_add_time: 1,
            sys_modify_time: 1,
            a: 1,
        };
        const o_ret = RowUtil.delCols(o_mock);

        expect(o_mock).toEqual({
            a: 1,
        });

        expect(o_ret).toEqual({
            a: 1,
        });
    });

    it("delListCols", () => {
        const a_mock = [
            {
                sys_add_time: 1,
                sys_modify_time: 1,
                a: 1,
            },
            {
                sys_add_time: 2,
                sys_modify_time: 2,
                a: 2,
            },
        ];
        const a_ret = RowUtil.delListCols(a_mock);

        expect(a_mock).toEqual([
            {
                a: 1,
            },
            {
                a: 2,
            },
        ]);

        expect(a_ret).toEqual([
            {
                a: 1,
            },
            {
                a: 2,
            },
        ]);
    });

    it("delListCols performance 100000 data less than 300ms", () => {
        const a_mock = [];
        const n_count = 100000;

        for (let i = 0; i <= n_count; i++) {
            a_mock.push({
                sys_add_time: 1,
                sys_modify_time: 1,
                a: 1,
            });
        }

        const n_start = new Date().getTime();

        RowUtil.delListCols(a_mock);

        const n_end = new Date().getTime();

        expect(n_end - n_start).toBeLessThan(300);
    });

    it("cpDelListCols performance 100000 data less than 500ms", () => {
        const a_mock = [];
        const n_count = 100000;

        for (let i = 0; i <= n_count; i++) {
            a_mock.push({
                sys_add_time: 1,
                sys_modify_time: 1,
                a: 1,
            });
        }

        const n_start = new Date().getTime();

        RowUtil.cpDelListCols(a_mock);

        const n_end = new Date().getTime();

        expect(n_end - n_start).toBeLessThan(500);
    });

    it("delListCols []", () => {
        const a_mock = [];
        const a_ret = RowUtil.delListCols(a_mock);

        expect(a_ret).toEqual([]);
    });

    it("delCols {}", () => {
        const o_mock = {};
        const o_ret = RowUtil.delCols(o_mock);

        expect(o_ret).toEqual({});
    });

    it("delCols user-defined cols", () => {
        const o_mock = {
            sys_add_time: 1,
            sys_modify_time: 1,
            a: 1,
            c: 2,
            b: 3,
        };
        const o_ret = RowUtil.delCols(o_mock, ["a", "b", "c"]);

        expect(o_ret).toEqual({ sys_add_time: 1, sys_modify_time: 1 });
    });

    it("delListCols user-defined cols", () => {
        const a_mock = [
            {
                sys_add_time: 1,
                sys_modify_time: 1,
                a: 1,
                c: 2,
                b: 3,
            },
            {
                sys_add_time: 1,
                sys_modify_time: 1,
                a: 1,
                c: 2,
                b: 3,
            },
        ];
        const a_ret = RowUtil.delListCols(a_mock, ["a", "b", "c"]);

        expect(a_ret).toEqual([
            { sys_add_time: 1, sys_modify_time: 1 },
            { sys_add_time: 1, sys_modify_time: 1 },
        ]);
    });
});
