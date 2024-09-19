import React from 'react';
import PropTypes from 'prop-types';

import { centsToDollars, moneyFormat } from 'util/moneyUtil';
import { routeToSubcategoryReport } from '../../actions/routing-actions';

export default class SubcategoryTotalRow extends React.Component {

  handleClick = () => {
    routeToSubcategoryReport(this.props.categoryId, this.props.subcategoryId);
  };

  render() {
    return (
      <tr className="subcategory clickable" onClick={this.handleClick}>
        <td className="name">{this.props.name}</td>
        <td className="money">{moneyFormat(centsToDollars(this.props.amount))}</td>
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
