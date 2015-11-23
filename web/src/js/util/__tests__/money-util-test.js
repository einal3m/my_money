import moneyUtil from '../money-util';

describe('moneyUtil', () => {
  describe('centsToDollar', () => {
    it('converts cents to dollars', () => {
      expect(moneyUtil.centsToDollars(1234)).toEqual(12.34);
    });
  });

  describe('moneyFormat', () => {
    it('converts dollar values into money format', () => {
      expect(moneyUtil.moneyFormat(67.97)).toEqual('$ 67.97');
      expect(moneyUtil.moneyFormat(67.9)).toEqual('$ 67.90');
      expect(moneyUtil.moneyFormat(6667.97)).toEqual('$ 6,667.97');
      expect(moneyUtil.moneyFormat(-67.97)).toEqual('$ (67.97)');
      expect(moneyUtil.moneyFormat(0.0)).toEqual('$  --');
    });
  });
});