'use strict';

import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';

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
    return moneyUtil.moneyFormat(moneyUtil.centsToDollars(balance));
  }

  renderMoneyIn(amount) {
    if (amount > 0) {
      return moneyUtil.numberFormat(moneyUtil.centsToDollars(amount));
    }
  }

  renderMoneyOut(amount) {
    if (amount < 0) {
      return moneyUtil.numberFormat(moneyUtil.centsToDollars(amount));
    }
  }

  render() {
    return (
      <tr>
        <td>{this.renderDate(this.props.transaction.get('date'))}</td>
        <td>{this.renderMemoNotes(this.props.transaction.get('memo'), this.props.transaction.get('notes'))}</td>
        <td>{this.renderMoneyIn(this.props.transaction.get('amount'))}</td>
        <td>{this.renderMoneyOut(this.props.transaction.get('amount'))}</td>
        <td>{this.renderBalance(this.props.transaction.get('balance'))}</td>
      </tr>
    );
  }
}
