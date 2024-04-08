import moneyUtil from "util/money-util";

describe("moneyUtil", () => {
  describe("centsToDollar", () => {
    it("converts cents to dollars", () => {
      expect(moneyUtil.centsToDollars(1234)).toEqual(12.34);
    });
  });

  describe("dollarsToCents", () => {
    it("converts dollars to cents", () => {
      expect(moneyUtil.dollarsToCents(12.34)).toEqual(1234);
      expect(moneyUtil.dollarsToCents(12.342)).toEqual(1234);
      expect(moneyUtil.dollarsToCents(12.347)).toEqual(1235);
    });
  });

  describe("moneyFormat", () => {
    it("converts dollar values into money format", () => {
      expect(moneyUtil.moneyFormat(67.97)).toEqual("$ 67.97");
      expect(moneyUtil.moneyFormat(67.9)).toEqual("$ 67.90");
      expect(moneyUtil.moneyFormat(6667.97)).toEqual("$ 6,667.97");
      expect(moneyUtil.moneyFormat(-67.97)).toEqual("$ (67.97)");
      expect(moneyUtil.moneyFormat(0.0)).toEqual("$  --");
    });
  });

  describe("numberFormat", () => {
    it("converts dollar amount into money format (without dollar sign, or sign)", () => {
      expect(moneyUtil.numberFormat(45.9)).toEqual("45.90");
      expect(moneyUtil.numberFormat(6745.9)).toEqual("6,745.90");
      expect(moneyUtil.numberFormat(0)).toEqual("0.00");
      expect(moneyUtil.numberFormat(-45.9)).toEqual("45.90");
    });
  });

  describe("numberFormatWithSign", () => {
    it("converts dollar values into money format without dollar, with sign", () => {
      expect(moneyUtil.numberFormatWithSign(67.9)).toEqual("67.90");
      expect(moneyUtil.numberFormatWithSign(-6667.97)).toEqual("-6,667.97");
      expect(moneyUtil.numberFormatWithSign(0.0)).toEqual("0.00");
    });
  });
});
