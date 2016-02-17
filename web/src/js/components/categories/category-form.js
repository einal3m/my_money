'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
import FormValidator from '../../util/form-validator';

export default class CategoryForm extends React.Component {
  constructor(props) {
    super();
    let category = props.category;

    if (!category) {
      category = { name: null }
    }

    this.state = { category: category }
    this.validator = new FormValidator(this.validationSchema());
  }

  validationSchema() {
    return {
      categoryTypeId: { presence: true },
      name: { presence: true }
    };
  }

  handleChange(event) {
    let category = this.state.category;
    category[event.target.name] = event.target.value;
    this.setState({category: category});
    this.validator.validateField(event.target.name, event.target.value);
  }

  isValid() {
    this.forceUpdate();
    return !this.validator.validateAll(this.state.category);
  }

  getModel() {
    return this.state.category;
  }

  render() {
    return (
      <div>
        <div className={`form-group ${this.validator.errorState('categoryTypeId')}`}>
          <label className='control-label'>Category Type</label>
          <select className="form-control" name="categoryTypeId" value={this.state.category.categoryTypeId}
            ref='categoryTypeIdField' onChange={this.handleChange.bind(this)}>
            <option value='2'>Income</option>
            <option value='3'>Expense</option>
          </select>         
          <div className='help-block'>{this.validator.errorFor('categoryTypeId')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('name')}`}>
          <label className='control-label'>Name</label>
          <input className='form-control' name='name' type='text' value={this.state.category.name} 
            onChange={this.handleChange.bind(this)} ref='nameField' />
          <div className='help-block'>{this.validator.errorFor('name')}</div>
        </div>
      </div>
    );
  }
}
