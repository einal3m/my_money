import accounting from 'accounting';

const moneyUtil = {
  centsToDollars(cents) {
    return cents / 100;
  },

  dollarsToCents(dollars) {
    return dollars * 100;
  },

  moneyFormat(dollars) {
    return accounting.formatMoney(dollars,
      { precision: 2, format: { pos: '%s %v', neg: '%s (%v)', zero: '%s  --' } });
  },

  numberFormat(dollars) {
    return accounting.formatNumber(Math.abs(dollars), 2, ',');
  },

  numberFormatWithSign(dollars) {
    return accounting.formatMoney(dollars,
      { precision: 2, format: { pos: '%v', neg: '-%v', zero: '0.00' } });
  },
};

export default moneyUtil;
