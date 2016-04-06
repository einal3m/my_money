import React from 'react';
import ReactDOM from 'react-dom';
import { MenuItem, DropdownButton} from 'react-bootstrap';

export default class SubcategoryPicker extends React.Component {

  onSelect(_event, key) {
    this.props.onChange(Number(key));
  }

  subcategoriesForCategory() {
    return this.props.subcategories.filter(subcategory => subcategory.categoryId === this.props.categoryId);
  }

  renderSubcategoryName(subcategory) {
    let selected = (this.props.value === subcategory.id);
    let prefix = selected ? '\u2713' : '\u00A0\u00A0';
    return `${prefix} ${subcategory.name}`;
  }

  renderSubcategories(subcategories) {
    return subcategories.map(subcategory => {
      return (
        <MenuItem key={subcategory.id} eventKey={subcategory.id}>
          {this.renderSubcategoryName(subcategory)}
        </MenuItem>
      )
    });
  }

  renderTitle() {
    let title;
    if (this.props.value) {
      this.props.subcategories.forEach(subcategory => {
        if (this.props.value === subcategory.id) {
          title = subcategory.name;
        }
      });
    } else {
      title = 'Please select...';
    }

    return title;
  }

  render() {
    let subcategories = this.subcategoriesForCategory();

    return (
      <div className='form-horizontal'>
        <DropdownButton title={this.renderTitle()} pullRight id='subcategory-dropdown'
                        onSelect={this.onSelect.bind(this)}>
          {this.renderSubcategories(subcategories)}
        </DropdownButton>
      </div>
    );
  }
}

SubcategoryPicker.propTypes = {
  value: React.PropTypes.number,
  categoryId: React.PropTypes.number.isRequired,
  subcategories: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};
