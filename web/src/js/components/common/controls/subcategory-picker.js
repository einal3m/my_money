import React from 'react';
import ReactDOM from 'react-dom';
import Picker from './picker';
require("../../../../css/picker.scss");

export default class SubcategoryPicker extends React.Component {

  subcategoriesForCategory() {
    return this.props.groupedCategories.map(categoryType => {
      return categoryType.categories.filter(category => category.id === this.props.categoryId);
    }).filter(array => array.length === 1)[0][0].subcategories;
  }

  render() {
    let subcategories = this.subcategoriesForCategory();

    return (
      <Picker value={this.props.value} options={subcategories} onChange={this.props.onChange} />
    );
  }
}

SubcategoryPicker.propTypes = {
  value: React.PropTypes.number,
  categoryId: React.PropTypes.number.isRequired,
  groupedCategories: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};
