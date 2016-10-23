'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
import FormValidator from '../../util/form-validator';
import Picker from '../common/controls/picker';

export default class CategoryForm extends React.Component {
  constructor(props) {
    super();
    this.state = { category: Object.assign({}, props.category) };
    this.validator = new FormValidator(this.validationSchema());
  }

  validationSchema() {
    return {
      categoryTypeId: { presence: true },
      name: { presence: true }
    };
  }

  handleCategoryTypeChange(categoryTypeId) {
    this.handleChange({target: {name: 'categoryTypeId', value: categoryTypeId}});
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
          <Picker name="categoryTypeId" value={this.state.category.categoryTypeId}
              options={this.props.categoryTypes} ref='categoryTypeIdField'
              onChange={this.handleCategoryTypeChange.bind(this)} />
          <div className='help-block'>{this.validator.errorFor('categoryTypeId')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('name')}`}>
          <label className='control-label'>Name</label>
          <input className='form-control' name='name' type='text' value={this.state.category.name || ''}
            onChange={this.handleChange.bind(this)} ref='nameField' />
          <div className='help-block'>{this.validator.errorFor('name')}</div>
        </div>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string,
    categoryTypeId: React.PropTypes.number
  }).isRequired,
  categoryTypes: React.PropTypes.array.isRequired
};

