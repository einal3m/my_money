import React, { PropTypes } from 'react';
import moneyUtil from '../../util/money-util';

export default class CategoryTotalRow extends React.Component {

  render() {
    return (
      <tr className="category">
        <td>{this.props.name}</td>
        <td className="money" />
        <td className="money">{moneyUtil.moneyFormat(moneyUtil.centsToDollars(this.props.amount))}</td>
      </tr>
    );
  }
}

CategoryTotalRow.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
