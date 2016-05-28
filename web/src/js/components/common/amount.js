import React from 'react';
import moneyUtil from '../../util/money-util';

export default class Amount extends React.Component {

  renderAmount(amount) {
    let sign;
    let formattedAmount = moneyUtil.numberFormat(moneyUtil.centsToDollars(amount));

    let cents = formattedAmount.substr(formattedAmount.length-2, 2);
    let dollars = formattedAmount.substr(0, formattedAmount.length-3);

    if (amount > 0) {
      sign = <span className='positive'>+</span>;
    } else if (amount < 0) {
      sign = <span className='negative'>-</span>;
    }
    return <span>{sign} <span className='dollars'>{dollars}</span>.<span className='cents'>{cents}</span></span>;
  }

  render() {
    return this.renderAmount(this.props.amount);
  }
}
