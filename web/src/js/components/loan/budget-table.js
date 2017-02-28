import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import BudgetRow from './budget-row';
import BudgetModal from './budget-modal';
import Button from '../common/controls/button';
import { getBudgets } from '../../actions/budget-actions';
import { showFormModal } from '../../actions/form-actions';

export class BudgetTableComponent extends React.Component {

  constructor() {
    super();
    getBudgets();
  }

  newBudget = () => {
    showFormModal('Budget', { accountId: this.props.account.id }, { allowDelete: false });
  };

  renderRows() {
    return this.props.budgets.map(budget => <BudgetRow key={budget.id} budget={budget} />);
  }

  renderTitle() {
    if (!this.props.loaded) return <div />;

    return (
      <div>
        <div className="pull-left"><h3>Budgeted income/expenses</h3></div>
        <div className="pull-left button-group"><Button onClick={this.newBudget}><Glyphicon glyph="plus" /> New</Button></div>
      </div>
    );
  }

  renderTable() {
    if (!this.props.loaded) return <div />;

    return (
      <table className="table table-hover" id="transaction-table">
        <thead>
          <tr>
            <th>description</th>
            <th>day of month</th>
            <th className="currency">amount</th>
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
        {this.renderTitle()}
        {this.renderTable()}
        <BudgetModal />
      </div>
    );
  }
}

BudgetTableComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  budgets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  account: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: state.budgetStore.get('loaded'),
    budgets: state.budgetStore.get('budgets').toJS(),
    account: state.accountStore.get('currentAccount').toJS(),
  };
}

export default connect(mapStateToProps)(BudgetTableComponent);
