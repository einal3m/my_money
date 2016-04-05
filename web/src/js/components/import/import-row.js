import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';
import Amount from '../common/amount';

export default class ImportRow extends React.Component {

  renderDate(date) {
    return moment(date, "YYYY-MM-DD").format('DD-MMM-YYYY');
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
        <td className='currency'><Amount amount={this.props.transaction.amount} /></td>
      </tr>
    );
  }
}
