import React from 'react';
import PropTypes from 'prop-types';
import Amount from '../common/Amount';
import Date from '../common/Date';
import { showFormModal } from '../../actions/form-actions';
import { memoAndNotes, categoryAndSubcategory } from 'util/textUtil';

export default class ReportTransactionRow extends React.Component {

  onClickHandler = () => {
    showFormModal('Transaction', this.props.transaction, { allowDelete: true, source: this.props.source });
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

ReportTransactionRow.propTypes = {
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
  source: PropTypes.string.isRequired,
};

