import React from 'react';
import PropTypes from 'prop-types';

import { centsToDollars, moneyFormat} from 'util/moneyUtil';
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
        <td className="money">{moneyFormat(centsToDollars(this.props.amount))}</td>
      </tr>
    );
  }
}

CategoryTotalRow.propTypes = {
  categoryId: PropTypes.number,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
