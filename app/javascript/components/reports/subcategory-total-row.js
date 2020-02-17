import React, { PropTypes } from 'react';
import moneyUtil from '../../util/money-util';
import { routeToSubcategoryReport } from '../../actions/routing-actions';

export default class SubcategoryTotalRow extends React.Component {

  handleClick = () => {
    routeToSubcategoryReport(this.props.categoryId, this.props.subcategoryId);
  };

  render() {
    return (
      <tr className="subcategory clickable" onClick={this.handleClick}>
        <td className="name">{this.props.name}</td>
        <td className="money">{moneyUtil.moneyFormat(moneyUtil.centsToDollars(this.props.amount))}</td>
        <td className="money" />
      </tr>
    );
  }
}

SubcategoryTotalRow.propTypes = {
  categoryId: PropTypes.number,
  subcategoryId: PropTypes.number,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
