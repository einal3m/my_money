'use strict';

import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';
import Amount from '../common/amount';
import Date from '../common/date';
import Balance from '../common/balance';

export default class TransactionRow extends React.Component {

  renderMemoNotes(memo, notes) {
    let text = memo ? memo : '';
    text += memo && notes ? '/' : '';
    text += notes ? notes : '';
    return text;
  }

  selectedCategory(categoryId) {
    return this.props.groupedCategories.map(categoryType =>
      categoryType.categories.filter(category => category.id === categoryId)
    ).filter(c => c.length > 0)[0][0];
  }

  selectedSubcategory(subcategoryId, category) {
    return category.subcategories.filter(subcategory => subcategory.id === subcategoryId)[0];
  }

  renderCategory(categoryId, subcategoryId) {
    if (!categoryId && !subcategoryId) return '';

    let selectedCategory = this.selectedCategory(categoryId);
    let text = selectedCategory.name;

    if (subcategoryId) {
      let selectedSubcategory = this.selectedSubcategory(subcategoryId, selectedCategory);
      text += `/${selectedSubcategory.name}`;
    }

    return text;
  }

  render() {
    return (
      <tr>
        <td><Date date={this.props.transaction.date} /></td>
        <td>
          <div>{this.renderMemoNotes(this.props.transaction.memo, this.props.transaction.notes)}</div>
          <div className='category'>{this.renderCategory(this.props.transaction.categoryId, this.props.transaction.subcategoryId)}</div>
        </td>
        <td className='currency'><Amount amount={this.props.transaction.amount} /></td>
        <td className='currency'><Balance balance={this.props.transaction.balance} /></td>
      </tr>
    );
  }
}

TransactionRow.propTypes = {
  transaction: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    date: React.PropTypes.string.isRequired,
    memo: React.PropTypes.string,
    notes: React.PropTypes.string,
    amount: React.PropTypes.number.isRequired,
    balance: React.PropTypes.number.isRequired,
    categoryId: React.PropTypes.number,
    subcategoryId: React.PropTypes.number
  }).isRequired,
  groupedCategories: React.PropTypes.array.isRequired
};

