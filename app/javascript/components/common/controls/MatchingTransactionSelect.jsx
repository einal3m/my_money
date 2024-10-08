import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import { memoAndNotes } from 'util/textUtil';

export default class MatchingTransactionSelect extends React.Component {

  groupedOptions() {
    const groupedAccounts = {};
    this.props.accounts.forEach((account) => {
      groupedAccounts[account.id] = { name: account.name, options: [] };
    });

    this.props.matchingTransactions.forEach((transaction) => {
      groupedAccounts[transaction.accountId].options.push(
        { id: transaction.id, name: memoAndNotes(transaction) }
      );
    });

    const optionGroups = [];

    Object.keys(groupedAccounts).forEach((key) => {
      if (groupedAccounts[key].options.length > 0) {
        optionGroups.push(groupedAccounts[key]);
      }
    });

    return optionGroups;
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    if (this.props.matchingTransactions.length === 0) {
      return <div>No matching transactions found.</div>;
    }

    return (
      <Select
        name="matchingTransactionId"
        value={this.props.value}
        groupedOptions={this.groupedOptions()}
        allowUnassigned={false}
        onChange={this.props.onChange}
      />
    );
  }
}

MatchingTransactionSelect.propTypes = {
  value: PropTypes.number,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  matchingTransactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    memo: PropTypes.string,
    notes: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
