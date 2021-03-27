import React from 'react';
import PropTypes from 'prop-types';
import Amount from '../common/Amount';
import Date from '../common/Date';
import Balance from '../common/Balance';
import { showFormModal } from '../../actions/form-actions';
import { memoAndNotes, categoryAndSubcategory, transferTo } from '../../util/text-util';

export default class TransactionRow extends React.Component {

  renderCategoryOrTransfer() {
    if (this.props.transaction.matchingTransaction) {
      return transferTo(this.props.transaction, this.props.transaction.matchingTransaction, this.props.accounts);
    }
    return categoryAndSubcategory(this.props.transaction, this.props.groupedCategories);
  }

  onClickHandler = () => {
    showFormModal('Transaction', this.props.transaction, { allowDelete: true });
  };

  render() {
    return (
      <tr className="click-me" onClick={this.onClickHandler}>
        <td><Date date={this.props.transaction.date} /></td>
        <td>
          <div>{memoAndNotes(this.props.transaction)}</div>
          <div className="category">
            {this.renderCategoryOrTransfer()}
          </div>
        </td>
        <td className="currency"><Amount amount={this.props.transaction.amount} /></td>
        <td className="currency"><Balance balance={this.props.transaction.balance} /></td>
      </tr>
    );
  }
}

TransactionRow.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    memo: PropTypes.string,
    notes: PropTypes.string,
    amount: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    categoryId: PropTypes.number,
    subcategoryId: PropTypes.number,
    matchingTransaction: PropTypes.shape({ accountId: PropTypes.number.isRequired }),
  }).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

