import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import TransactionRow from './transaction-row';
import { groupedCategories } from '../../selectors/category-selector';

require('../../../css/transaction.scss');

export class TransactionTableComponent extends React.Component {

  renderTransactions() {
    return this.props.transactions.map((transaction) => {
      return (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          groupedCategories={this.props.groupedCategories}
          subcategories={this.props.subcategories}
        />
      );
    });
  }

  renderTitle() {
    if (this.props.searchCriteriaLoaded) {
      return <h3>Transactions for {this.props.account.name}</h3>;
    }
  }

  renderTable() {
    if (!this.props.searchCriteriaLoaded) {
      return;
    }
    if (this.props.transactions.length > 0) {
      return (
        <Table hover id="transaction-table">
          <thead>
            <tr>
              <th className="date">date</th>
              <th>description</th>
              <th className="currency">amount</th>
              <th className="currency">balance</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTransactions()}
          </tbody>
        </Table>
      );
    } else {
      return <div>No transactions match the search criteria</div>;
    }
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTable()}
      </div>
    );
  }
}

TransactionTableComponent.propTypes = {
  account: React.PropTypes.shape({ name: React.PropTypes.string }),
  searchCriteriaLoaded: React.PropTypes.bool.isRequired,
  transactions: React.PropTypes.arrayOf(React.PropTypes.shape({ id: React.PropTypes.number.isRequired })),
  groupedCategories: React.PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    transactions: state.transactionStore.get('transactions').toJS(),
    account: state.accountStore.get('currentAccount').toJS(),
    searchCriteriaLoaded: state.accountStore.get('loaded') && state.dateRangeStore.get('loaded'),
    groupedCategories: groupedCategories(state).toJS(),
  };
}

export default connect(mapStateToProps)(TransactionTableComponent);
