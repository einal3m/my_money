import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '../common/controls/FormControl';
import MatchingTransactionSelect from '../common/controls/MatchingTransactionSelect';
import { transferTo, memoAndNotes } from 'util/textUtil';

export default class MatchingTransaction extends React.Component {

  renderCurrentMatchingTransaction() {
    return (
      <div className="row">
        <div className="col-xs-1">
          <i className="fa fa-times-circle clickable" onClick={this.props.onClear} />
        </div>
        <div className="col-xs-11">
          <div>
            {transferTo(this.props.transaction, this.props.transaction.matchingTransaction, this.props.accounts)}
          </div>
          <div>Description: {memoAndNotes(this.props.transaction.matchingTransaction)}</div>
        </div>
      </div>
    );
  }

  renderMatchingTransactionSelect() {
    return (
      <MatchingTransactionSelect
        name="matchingTransactionId"
        value={this.props.transaction.matchingTransactionId}
        accounts={this.props.accounts}
        matchingTransactions={this.props.matchingTransactions}
        loading={this.props.matchLoading}
        allowUnassigned
        onChange={this.props.onChange}
      />
    );
  }

  renderMatchingTransaction() {
    if (this.props.transaction.matchingTransaction) return this.renderCurrentMatchingTransaction();
    return this.renderMatchingTransactionSelect();
  }

  render() {
    return (
      <FormControl name="matchingTransactionId" label="Matching Transaction">
        {this.renderMatchingTransaction()}
      </FormControl>
    );
  }
}

MatchingTransaction.propTypes = {
  transaction: PropTypes.shape({
    matchingTransactionId: PropTypes.number,
    matchingTransaction: PropTypes.shape({ accountId: PropTypes.number.isRequired }),
  }).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  matchLoading: PropTypes.bool.isRequired,
  matchingTransactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
