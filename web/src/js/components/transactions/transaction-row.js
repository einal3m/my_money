import React, { PropTypes } from 'react';
import Amount from '../common/amount';
import Date from '../common/date';
import Balance from '../common/balance';
import { showFormModal } from '../../actions/form-actions';

export default class TransactionRow extends React.Component {

  renderMemoNotes = (memo, notes) => {
    let text = memo || '';
    text += memo && notes ? '/' : '';
    text += notes || '';
    return text;
  };

  selectedCategory(categoryId) {
    return this.props.groupedCategories.map(categoryType =>
      categoryType.categories.filter(category => category.id === categoryId)
    ).filter(c => c.length > 0)[0][0];
  }

  selectedSubcategory = (subcategoryId, category) => (
    category.subcategories.filter(subcategory => subcategory.id === subcategoryId)[0]
  );

  renderCategory(categoryId, subcategoryId) {
    if (!categoryId && !subcategoryId) return '';

    const selectedCategory = this.selectedCategory(categoryId);
    let text = selectedCategory.name;

    if (subcategoryId) {
      const selectedSubcategory = this.selectedSubcategory(subcategoryId, selectedCategory);
      text += `/${selectedSubcategory.name}`;
    }

    return text;
  }

  onClickHandler = () => {
    showFormModal('Transaction', this.props.transaction, { allowDelete: true });
  };

  render() {
    return (
      <tr onClick={this.onClickHandler}>
        <td><Date date={this.props.transaction.date} /></td>
        <td>
          <div>{this.renderMemoNotes(this.props.transaction.memo, this.props.transaction.notes)}</div>
          <div className="category">
            {this.renderCategory(this.props.transaction.categoryId, this.props.transaction.subcategoryId)}
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
  }).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

