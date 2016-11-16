import React, { PropTypes } from 'react';
import Amount from '../common/amount';
import Date from '../common/date';
import { showFormModal } from '../../actions/form-actions';
import { memoAndNotes, categoryAndSubcategory } from '../../util/transaction-util';

export default class TransactionRow extends React.Component {

  onClickHandler = () => {
    showFormModal('Transaction', this.props.transaction, true);
  };

  renderAccount() {
    return (
      <div>
        {this.props.account.name}
        <br />
        {this.props.account.bank}
      </div>
    );
  }

  render() {
    return (
      <tr onClick={this.onClickHandler}>
        <td><Date date={this.props.transaction.date} /></td>
        <td>{this.renderAccount()}</td>
        <td>
          <div>{memoAndNotes(this.props.transaction)}</div>
          <div className="category">{categoryAndSubcategory(this.props.transaction, this.props.groupedCategories)}</div>
        </td>
        <td className="currency"><Amount amount={this.props.transaction.amount} /></td>
      </tr>
    );
  }
}

TransactionRow.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    accountId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    memo: PropTypes.string,
    notes: PropTypes.string,
    amount: PropTypes.number.isRequired,
    categoryId: PropTypes.number,
    subcategoryId: PropTypes.number,
  }).isRequired,
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bank: PropTypes.string,
  }).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

