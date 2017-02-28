import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getBudgets } from '../../actions/budget-actions';

export class BudgetTableComponent extends React.Component {

  constructor() {
    super();
    getBudgets();
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
            <th>credit</th>
          </tr>
        </thead>
      </table>
    );
  }

  render() {
    console.log(this.props.budgets);
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
