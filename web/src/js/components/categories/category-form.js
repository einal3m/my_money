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
    category.categoryType = props.categoryType;


    this.state = { category: category }

    console.log(this.state);
    this.validator = new FormValidator(this.validationSchema());
  }

  validationSchema() {
    return {
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

  getCategory() {
    return this.state.category;
  }

  render() {
    return (
      <div>
        <div>
          {this.state.category.categoryType.name}
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
