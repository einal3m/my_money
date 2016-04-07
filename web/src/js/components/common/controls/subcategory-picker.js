import React from 'react';
import ReactDOM from 'react-dom';
import Picker from './picker';
require("../../../../css/picker.scss");

export default class SubcategoryPicker extends React.Component {

  subcategoriesForCategory() {
    return this.props.subcategories.filter(subcategory => subcategory.categoryId === this.props.categoryId);
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
  subcategories: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};
