import React, { PropTypes } from 'react';
import moneyUtil from '../../util/money-util';

export default class SubcategoryTotalRow extends React.Component {

  render() {
    return (
      <tr className="subcategory">
        <td className="name">{this.props.name}</td>
        <td className="money">{moneyUtil.moneyFormat(moneyUtil.centsToDollars(this.props.amount))}</td>
        <td className="money" />
      </tr>
    );
  }
}

SubcategoryTotalRow.propTypes = {
  subcategoryId: PropTypes.number,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
