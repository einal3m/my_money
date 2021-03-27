import React from 'react';
import PropTypes from 'prop-types';
import { showFormModal } from '../../actions/form-actions';
import Amount from '../common/Amount';

export default class BudgetRow extends React.Component {

  onClickHandler = () => {
    showFormModal('Budget', this.props.budget, { allowDelete: true });
  };

  render() {
    return (
      <tr onClick={this.onClickHandler}>
        <td>{this.props.budget.description}</td>
        <td>{this.props.budget.dayOfMonth}</td>
        <td className="currency"><Amount amount={this.props.budget.amount} /></td>
      </tr>
    );
  }
}

BudgetRow.propTypes = {
  budget: PropTypes.shape({
    description: PropTypes.string,
    dayOfMonth: PropTypes.number,
    amount: PropTypes.number,
    credit: PropTypes.bool,
  }).isRequired,
};

