import React from 'react';
import PropTypes from 'prop-types';
import moneyUtil from '../../util/money-util';
import { routeToCategoryReport } from '../../actions/routing-actions';

export default class CategoryTotalRow extends React.Component {

  handleClick = () => {
    routeToCategoryReport(this.props.categoryId);
  };

  render() {
    return (
      <tr className="category clickable" onClick={this.handleClick}>
        <td>{this.props.name}</td>
        <td className="money" />
        <td className="money">{moneyUtil.moneyFormat(moneyUtil.centsToDollars(this.props.amount))}</td>
      </tr>
    );
  }
}

CategoryTotalRow.propTypes = {
  categoryId: PropTypes.number,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
