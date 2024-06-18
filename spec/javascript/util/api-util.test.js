import apiUtil from "util/api-util";

describe("apiUtil", () => {
  describe("getUrl", () => {
    it("gets the right url", () => {
      expect(apiUtil.getUrl("accounts")).toEqual("/api/accounts");
    });
  });
});
