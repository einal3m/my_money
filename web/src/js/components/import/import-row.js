import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';

export default class ImportRow extends React.Component {
  renderDate(date) {
    return moment(date, "YYYY-MM-DD").format('DD-MMM-YYYY');
  }

  renderMemoNotes(memo, notes) {
    let text = memo ? memo : '';
    text += memo && notes ? '/' : '';
    text += notes ? notes : '';
    return text;
  }

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
    return (
      <tr>
        <td>t</td>
        <td>{this.renderDate(this.props.transaction.date)}</td>
        <td>{this.props.transaction.memo}</td>
        <td>{this.props.transaction.notes}</td>
        <td>{this.props.transaction.categoryId}</td>
        <td>{this.props.transaction.subcategoryId}</td>
        <td className='currency'>{this.renderAmount(this.props.transaction.amount)}</td>
      </tr>
    );
  }
}
