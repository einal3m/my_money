import React from 'react';
import moneyUtil from '../../util/money-util';

export default class Balance extends React.Component {

  render() {
    let formattedAmount = moneyUtil.numberFormat(moneyUtil.centsToDollars(this.props.balance));

    let cents = formattedAmount.substr(formattedAmount.length-2, 2);
    let dollars = formattedAmount.substr(0, formattedAmount.length-3);

    let rightBracket;
    if (this.props.balance < 0) {
      dollars = '(' + dollars;
      rightBracket = <span className='dollars'>)</span>;
    }
    dollars = '$' + dollars;
    return <span><span className='dollars'>{dollars}</span>.<span className='cents'>{cents}</span>{rightBracket}</span>;
  }
}

Balance.propTypes = {
  balance: React.PropTypes.number.isRequired
}