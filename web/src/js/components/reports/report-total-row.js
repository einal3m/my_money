import React, { PropTypes } from 'react';
import moneyUtil from '../../util/money-util';

const ReportTotalRow = props => (
  <tr className="total">
    <td>Total</td>
    <td className="money" />
    <td className="money">{moneyUtil.moneyFormat(moneyUtil.centsToDollars(props.amount))}</td>
  </tr>
);

ReportTotalRow.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default ReportTotalRow;
