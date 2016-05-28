'use strict';

import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';
import Amount from '../common/amount';
import Date from '../common/date';

export default class TransactionRow extends React.Component {

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
        <td><Date date={this.props.transaction.date} /></td>
        <td>{this.renderMemoNotes(this.props.transaction.memo, this.props.transaction.notes)}</td>
        <td className='currency'><Amount amount={this.props.transaction.amount} /></td>
        <td className='currency'>{this.renderBalance(this.props.transaction.balance)}</td>
      </tr>
    );
  }
}

TransactionRow.propTypes = {
  transaction: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    date: React.PropTypes.string.isRequired,
    memo: React.PropTypes.string,
    notes: React.PropTypes.string,
    amount: React.PropTypes.number.isRequired,
    balance: React.PropTypes.number.isRequired
  }).isRequired,
  groupedCategories: React.PropTypes.array.isRequired,
  subcategories: React.PropTypes.array.isRequired
};

