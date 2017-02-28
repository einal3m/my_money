import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BudgetRow from './budget-row';
import { getBudgets } from '../../actions/budget-actions';

export class BudgetTableComponent extends React.Component {

  constructor() {
    super();
    getBudgets();
  }

  renderRows() {
    return this.props.budgets.map(budget => <BudgetRow key={budget.id} budget={budget} />);
  }

  renderTable() {
    if (!this.props.loaded) return <div />;

    return (
      <table className="table table-hover" id="transaction-table">
        <thead>
          <tr>
            <th>description</th>
            <th>day of month</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}

BudgetTableComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  budgets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: state.budgetStore.get('loaded'),
    budgets: state.budgetStore.get('budgets').toJS(),
  };
}

export default connect(mapStateToProps)(BudgetTableComponent);
