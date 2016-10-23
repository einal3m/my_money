import React from 'react';
import moneyUtil from '../../util/money-util';

export default class Amount extends React.Component {

  renderAmount(amount) {
    let sign;
    const formattedAmount = moneyUtil.numberFormat(moneyUtil.centsToDollars(amount));

    const cents = formattedAmount.substr(formattedAmount.length - 2, 2);
    const dollars = formattedAmount.substr(0, formattedAmount.length - 3);

    if (amount > 0) {
      sign = <span className="positive">+</span>;
    } else if (amount < 0) {
      sign = <span className="negative">-</span>;
    }
    return <span>{sign} <span className="dollars">{dollars}</span>.<span className="cents">{cents}</span></span>;
  }

  render() {
    return this.renderAmount(this.props.amount);
  }
}
