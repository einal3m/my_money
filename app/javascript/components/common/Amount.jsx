import React from 'react';
import PropTypes from 'prop-types';

import { centsToDollars, numberFormat } from 'util/moneyUtil';

export default class Amount extends React.Component {

  renderAmount() {
    let sign;
    const formattedAmount = numberFormat(centsToDollars(this.props.amount));

    const cents = formattedAmount.substr(formattedAmount.length - 2, 2);
    const dollars = formattedAmount.substr(0, formattedAmount.length - 3);

    if (this.props.amount > 0) {
      sign = <span className="positive">+</span>;
    } else if (this.props.amount < 0) {
      sign = <span className="negative">-</span>;
    }
    return <span>{sign} <span className="dollars">{dollars}</span>.<span className="cents">{cents}</span></span>;
  }

  render() {
    return this.renderAmount();
  }
}

Amount.propTypes = {
  amount: PropTypes.number,
};
