'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
import FormValidator from '../../util/form-validator';

export default class SubcategoryForm extends React.Component {

  constructor(props) {
    super();
    let subcategory = props.subcategory;

    if (!subcategory) {
      subcategory = { name: null, categoryId: null}
    }

    this.state = { subcategory: subcategory }
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

  renderCategoryTypes() {
    let options = [];
    this.props.groupedCategories.forEach(categoryType => {
      options.push(<optgroup key={`catType_${categoryType.categoryType.id}`} label={categoryType.categoryType.name} />);

      categoryType.categories.forEach(category => {
        options.push(<option key={`cat_${category.id}`} value={category.id}>{category.name}</option>)
      });
    });
    return options;
  }

  render() {
    return (
      <div>
        <div className={`form-group ${this.validator.errorState('categoryId')}`}>
          <label className='control-label'>Category</label>
          <select className="form-control" name="categoryId" value={this.state.subcategory.categoryId}
            ref='categoryIdField' onChange={this.handleChange.bind(this)}>
            {this.renderCategoryTypes()}
          </select>         
          <div className='help-block'>{this.validator.errorFor('categoryId')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('name')}`}>
          <label className='control-label'>Name</label>
          <input className='form-control' name='name' type='text' value={this.state.subcategory.name} 
            onChange={this.handleChange.bind(this)} ref='nameField' />
          <div className='help-block'>{this.validator.errorFor('name')}</div>
        </div>
      </div>
    );
  }
}
