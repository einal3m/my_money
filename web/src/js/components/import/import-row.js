import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';
import Amount from '../common/amount';
import GroupedCategorySelect from '../common/controls/grouped-category-select';
import SubcategoryPicker from '../common/controls/subcategory-picker';

export default class ImportRow extends React.Component {

  categoryChange() {

  }

  subcategoryChange() {

  }

  renderDate(date) {
    return moment(date, "YYYY-MM-DD").format('DD-MMM-YYYY');
  }

  renderImport() {
    return (
      <input type='checkbox' className='form-control' checked={this.props.transaction.import} />
    );
  }

  renderNotes() {
    return (
      <input className='form-control' value={this.props.transaction.notes} />
    );
  }

  renderCategory() {
    return (
      <GroupedCategorySelect groupedCategories={this.props.groupedCategories}
                             onChange={this.categoryChange.bind(this)}
                             value={this.props.transaction.categoryId} />
    );
  }

  renderSubcategory() {
    let subcategories = this.props.subcategories.filter(
      subcategory => subcategory.categoryId === this.props.transaction.categoryId
    );

    return (
      <SubcategoryPicker subcategories={subcategories}
                         onChange={this.subcategoryChange.bind(this)}
                         value={this.props.transaction.subcategoryId} />
    );
  }

  render() {
    return (
      <tr>
        <td>{this.renderImport()}</td>
        <td>{this.renderDate(this.props.transaction.date)}</td>
        <td>{this.props.transaction.memo}</td>
        <td>{this.renderNotes()}</td>
        <td>{this.renderCategory()}</td>
        <td>{this.renderSubcategory()}</td>
        <td className='currency'><Amount amount={this.props.transaction.amount} /></td>
      </tr>
    );
  }
}

ImportRow.propTypes = {
  transaction: React.PropTypes.object.isRequired,
  groupedCategories: React.PropTypes.array.isRequired,
  subcategories: React.PropTypes.array.isRequired
};
