import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TransactionRow from './TransactionRow';
import { groupedCategories } from '../../selectors/category-selector';
import { accountNameAndBank } from '../../util/text-util';

import '../../stylesheets/transaction.scss';

export class TransactionTableComponent extends React.Component {

  renderTransactions() {
    return this.props.transactions.map(transaction => (
      <TransactionRow
        key={transaction.id}
        transaction={transaction}
        groupedCategories={this.props.groupedCategories}
        accounts={this.props.accounts}
      />
    ));
  }

  renderTitle() {
    if (this.props.searchCriteriaLoaded) {
      return <h3>Transactions for {accountNameAndBank(this.props.account)}</h3>;
    }
    return undefined;
  }

  renderTable() {
    if (!this.props.searchCriteriaLoaded) {
      return undefined;
    }
    if (this.props.transactions.length > 0) {
      return (
        <table className="table table-hover" id="transaction-table">
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
        </table>
      );
    }
    return <div className="empty-state">No transactions match the search criteria</div>;
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
  account: PropTypes.shape({ name: PropTypes.string }),
  accounts: PropTypes.arrayOf(PropTypes.shape({})),
  searchCriteriaLoaded: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })),
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function mapStateToProps(state) {
  return {
    transactions: state.transactionStore.get('transactions').toJS(),
    account: state.accountStore.get('currentAccount').toJS(),
    accounts: state.accountStore.get('accounts').toJS(),
    searchCriteriaLoaded: state.accountStore.get('loaded') && state.dateRangeStore.get('loaded'),
    groupedCategories: groupedCategories(state).toJS(),
  };
}

export default connect(mapStateToProps)(TransactionTableComponent);
