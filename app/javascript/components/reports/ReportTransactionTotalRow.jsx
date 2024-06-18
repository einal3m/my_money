import React from 'react';
import PropTypes from 'prop-types';
import Amount from '../common/Amount';

const ReportTransactionTotalRow = ({total}) => (
  <tr className="total">
    <td>Total</td>
    <td></td>
    <td></td>
    <td className="currency"><Amount amount={total} /></td>
  </tr>
);

ReportTransactionTotalRow.propTypes = {
  total: PropTypes.number.isRequired,
};

export default ReportTransactionTotalRow;
