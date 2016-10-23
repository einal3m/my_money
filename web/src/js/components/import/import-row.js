import React from 'react';
import moment from 'moment';
import moneyUtil from '../../util/money-util';
import Amount from '../common/amount';
import Date from '../common/date';
import GroupedCategorySelect from '../common/controls/grouped-category-select';
import SubcategoryPicker from '../common/controls/subcategory-picker';
import importActions from '../../actions/import-actions';

export default class ImportRow extends React.Component {

  onImportChange(event) {
    importActions.setImport(this.props.index, event.target.checked);
  }

  onCategoryChange(event) {
    importActions.setCategoryId(this.props.index, event.target.value);
  }

  onSubcategoryChange(subcategoryId) {
    importActions.setSubcategoryId(this.props.index, subcategoryId);
  }

  onNotesChange(event) {
    importActions.setNotes(this.props.index, event.target.value);
  }

  renderImport() {
    return (
      <input type="checkbox" checked={this.props.transaction.import}
        onChange={this.onImportChange.bind(this)}
      />
    );
  }

  renderNotes() {
    return (
      <input className="form-control" value={this.props.transaction.notes} onChange={this.onNotesChange.bind(this)} />
    );
  }

  renderCategory() {
    return (
      <GroupedCategorySelect groupedCategories={this.props.groupedCategories}
        onChange={this.onCategoryChange.bind(this)}
        value={this.props.transaction.categoryId}
      />
    );
  }

  renderSubcategory() {
    if (!this.props.transaction.categoryId) {
      return;
    }

    return (
      <SubcategoryPicker groupedCategories={this.props.groupedCategories}
        categoryId={this.props.transaction.categoryId}
        onChange={this.onSubcategoryChange.bind(this)}
        value={this.props.transaction.subcategoryId}
      />
    );
  }

  rowClass() {
    if (this.props.transaction.duplicate) {
      return 'danger';
    }
    return '';
  }

  render() {
    return (
      <tr className={this.rowClass()}>
        <td><Date date={this.props.transaction.date} /></td>
        <td>{this.props.transaction.memo}</td>
        <td>{this.renderNotes()}</td>
        <td>{this.renderCategory()}</td>
        <td>{this.renderSubcategory()}</td>
        <td className="currency"><Amount amount={this.props.transaction.amount} /></td>
        <td>{this.renderImport()}</td>
      </tr>
    );
  }
}

ImportRow.propTypes = {
  index: React.PropTypes.number.isRequired,
  transaction: React.PropTypes.object.isRequired,
  groupedCategories: React.PropTypes.array.isRequired,
  subcategories: React.PropTypes.array.isRequired,
};
