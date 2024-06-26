import dateUtil from "util/date-util";

describe("dateUtil", () => {
  describe("chartFormat", () => {
    it("returns date in dd-MMM-yy format", () => {
      const date = new Date("2015-04-05");

      expect(dateUtil.chartFormat(date)).toEqual("05-Apr-15");
    });
  });
});
