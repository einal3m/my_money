import React from 'react';
import PropTypes from 'prop-types';
import Amount from '../common/Amount';
import Date from '../common/Date';
import GroupedCategorySelect from '../common/controls/GroupedCategorySelect';
import SubcategoryPicker from '../common/controls/SubcategoryPicker';
import { setImport, setCategoryId, setSubcategoryId, setNotes } from '../../actions/import-actions';

export default class ImportRow extends React.Component {

  onImportChange = (event) => {
    setImport(this.props.index, event.target.checked);
  };

  onCategoryChange = (event) => {
    setCategoryId(this.props.index, event.target.value);
  };

  onSubcategoryChange = (subcategoryId) => {
    setSubcategoryId(this.props.index, subcategoryId);
  };

  onNotesChange = (event) => {
    setNotes(this.props.index, event.target.value);
  };

  renderImport() {
    return (
      <input
        data-testid="import-checkbox"
        type="checkbox"
        checked={this.props.transaction.import}
        onChange={this.onImportChange}
      />
    );
  }

  renderNotes() {
    return (
      <input
        data-testid="import-notes"
        className="form-control"
        value={this.props.transaction.notes || ""}
        onChange={this.onNotesChange}
      />
    );
  }

  renderCategory() {
    return (
      <div data-testid="import-category">
        <GroupedCategorySelect
          groupedCategories={this.props.groupedCategories}
          onChange={this.onCategoryChange}
          value={this.props.transaction.categoryId}
          allowUnassigned
        />
      </div>
    );
  }

  renderSubcategory() {
    if (!this.props.transaction.categoryId) {
      return undefined;
    }

    return (
      <div data-testid="import-subcategory">
        <SubcategoryPicker
          groupedCategories={this.props.groupedCategories}
          categoryId={this.props.transaction.categoryId}
          onChange={this.onSubcategoryChange}
          value={this.props.transaction.subcategoryId}
        />
      </div>
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
  index: PropTypes.number.isRequired,
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
    memo: PropTypes.string,
    notes: PropTypes.string,
    amount: PropTypes.amount,
    duplicate: PropTypes.bool,
    import: PropTypes.bool,
    categoryId: PropTypes.number,
    subcategoryId: PropTypes.number,
  }).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
