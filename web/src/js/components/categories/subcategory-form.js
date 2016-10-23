'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
import FormValidator from '../../util/form-validator';
import GroupedCategorySelect from '../common/controls/grouped-category-select';

export default class SubcategoryForm extends React.Component {

  constructor(props) {
    super();
    this.state = { subcategory: Object.assign({}, props.subcategory) };
    this.validator = new FormValidator(this.validationSchema());
  }

  validationSchema() {
    return {
      name: { presence: true },
      categoryId: { presence: true }
    };
  }

  handleChange(event) {
    let subcategory = this.state.subcategory;
    subcategory[event.target.name] = event.target.value;
    this.setState({subcategory: subcategory});
    this.validator.validateField(event.target.name, event.target.value);
  }

  isValid() {
    this.forceUpdate();
    return !this.validator.validateAll(this.state.subcategory);
  }

  getModel() {
    return this.state.subcategory;
  }

  render() {
    return (
      <div>
        <div className={`form-group ${this.validator.errorState('categoryId')}`}>
          <label className='control-label'>Category</label>
          <GroupedCategorySelect name="categoryId" value={this.state.subcategory.categoryId}
            ref='categoryIdField' groupedCategories={this.props.groupedCategories} onChange={this.handleChange.bind(this)} />
          <div className='help-block'>{this.validator.errorFor('categoryId')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('name')}`}>
          <label className='control-label'>Name</label>
          <input className='form-control' name='name' type='text' value={this.state.subcategory.name || ''}
            onChange={this.handleChange.bind(this)} ref='nameField' />
          <div className='help-block'>{this.validator.errorFor('name')}</div>
        </div>
      </div>
    );
  }
}

SubcategoryForm.propTypes = {
  subcategory: React.PropTypes.shape({
    name: React.PropTypes.string,
    categoryId: React.PropTypes.number
  }).isRequired,
  groupedCategories: React.PropTypes.array.isRequired
};
