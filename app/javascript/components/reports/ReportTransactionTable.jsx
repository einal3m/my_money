import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReportTransactionRow from './ReportTransactionRow';
import { groupedCategories } from '../../selectors/category-selector';
import TransactionModal from '../transactions/TransactionModal';

import '../../stylesheets/transaction.scss';
import ReportTransactionTotalRow from './ReportTransactionTotalRow';

export class ReportTransactionTableComponent extends React.Component {

  renderTransactions() {
    return this.props.transactions.map(transaction => (
      <ReportTransactionRow
        key={transaction.id}
        account={this.props.accounts.filter(account => account.id === transaction.accountId)[0]}
        transaction={transaction}
        groupedCategories={this.props.groupedCategories}
        source={this.props.source}
      />
    ));
  }

  renderTotalRow() {
    let total = 0;
    this.props.transactions.forEach(transaction => {
      total += transaction.amount
    })
      
    return <ReportTransactionTotalRow total={total} />
  }
  
  renderTitle() {
    if (this.props.loaded) {
      return <h3>Transactions</h3>;
    }
    return undefined;
  }

  renderTable() {
    if (this.props.loaded) {
      return (
        <table className="table table-hover table-report" id="transaction-table">
          <thead>
            <tr>
              <th className="date">date</th>
              <th>account</th>
              <th>description</th>
              <th className="currency">amount</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTransactions()}
            {this.renderTotalRow()}
          </tbody>
        </table>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTable()}
        <TransactionModal />
      </div>
    );
  }
}

ReportTransactionTableComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })),
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  source: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: state.reportStore.get('loaded'),
    accounts: state.accountStore.get('accounts').toJS(),
    transactions: state.reportStore.get('transactions').toJS(),
    groupedCategories: groupedCategories(state).toJS(),
  };
}

export default connect(mapStateToProps)(ReportTransactionTableComponent);
