import React, { PropTypes } from 'react';
import DropDown from './drop-down';

export default class SubcategoryPicker extends React.Component {

  subcategoriesForCategory() {
    return this.props.groupedCategories.map(categoryType =>
      categoryType.categories.filter(category => category.id === this.props.categoryId)
    ).filter(array => array.length === 1)[0][0].subcategories;
  }

  render() {
    const subcategories = this.subcategoriesForCategory();

    return (
      <DropDown value={this.props.value} options={subcategories} allowUnassigned onChange={this.props.onChange} />
    );
  }
}

SubcategoryPicker.propTypes = {
  value: PropTypes.number,
  categoryId: PropTypes.number.isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
};
