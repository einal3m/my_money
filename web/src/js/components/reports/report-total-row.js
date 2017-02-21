import React, { PropTypes } from 'react';
import moneyUtil from '../../util/money-util';

export default class ReportTotalRow extends React.Component {

  render() {
    return (
      <tr className="total">
        <td>Total</td>
        <td className="money" />
        <td className="money">{moneyUtil.moneyFormat(moneyUtil.centsToDollars(this.props.amount))}</td>
      </tr>
    );
  }
}

ReportTotalRow.propTypes = {
  amount: PropTypes.number.isRequired,
};
