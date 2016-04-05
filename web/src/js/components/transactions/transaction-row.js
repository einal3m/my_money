'use strict';

import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';
import Amount from '../common/amount';

export default class TransactionRow extends React.Component {
  renderDate(date) {
    return moment(date, "YYYY-MM-DD").format('DD-MMM-YYYY');
  }

  renderMemoNotes(memo, notes) {
    let text = memo ? memo : '';
    text += memo && notes ? '/' : '';
    text += notes ? notes : '';
    return text;
  }

  renderBalance(balance) {
    let formattedAmount = moneyUtil.numberFormat(moneyUtil.centsToDollars(balance));

    let cents = formattedAmount.substr(formattedAmount.length-2, 2);
    let dollars = formattedAmount.substr(0, formattedAmount.length-3);

    let rightBracket;
    if (balance < 0) {
      dollars = '(' + dollars;
      rightBracket = <span className='dollars'>)</span>;   
    }
    dollars = '$' + dollars;
    return <span><span className='dollars'>{dollars}</span>.<span className='cents'>{cents}</span>{rightBracket}</span>;
  }

  render() {
    return (
      <tr>
        <td>{this.renderDate(this.props.transaction.get('date'))}</td>
        <td>{this.renderMemoNotes(this.props.transaction.get('memo'), this.props.transaction.get('notes'))}</td>
        <td className='currency'><Amount amount={this.props.transaction.get('amount')} /></td>
        <td className='currency'>{this.renderBalance(this.props.transaction.get('balance'))}</td>
      </tr>
    );
  }
}
