import React from 'react';
import PropTypes from 'prop-types';

import { centsToDollars, moneyFormat } from 'util/moneyUtil';

const ReportTotalRow = props => (
  <tr className="total">
    <td>Total</td>
    <td className="money" />
    <td className="money">{moneyFormat(centsToDollars(props.amount))}</td>
  </tr>
);

ReportTotalRow.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default ReportTotalRow;
