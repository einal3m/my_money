import accounting from 'accounting';

let moneyUtil = {
  centsToDollars(cents) {
    return cents / 100;
  },

  moneyFormat(dollars) {
    return accounting.formatMoney(dollars, 
      {precision: 2, format: { pos : "%s %v", neg : "%s (%v)", zero: "%s  --" }});
  }
};

export default moneyUtil;