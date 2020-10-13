import { RowUtil } from "../../../src/util";

describe("RowUtil test", () => {
  it("pickCols", () => {
    const o_mock = {
      sys_add_time: 1,
      sys_modify_time: 1,
      a: 1,
    };
    const o_ret = RowUtil.pickCols(o_mock, ["sys_add_time"]);

    console.log(o_ret)
    expect(o_ret).toEqual({
      sys_add_time: 1,
    });
  });


  it("pickCols not exist", () => {
    const o_mock = {
      sys_add_time: 1,
      sys_modify_time: 1,
      a: 1,
    };
    const o_ret = RowUtil.pickCols(o_mock, ["sys_add_time", "3"]);

    console.log(o_ret)
    expect(o_ret).toEqual({
      sys_add_time: 1,
    });
  });
});
