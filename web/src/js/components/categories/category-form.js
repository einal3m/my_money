import React, { PropTypes } from 'react';
import FormValidator from '../../util/form-validator';
import FormControl from '../common/controls/form-control';
import DropDown from '../common/controls/drop-down';

export default class CategoryForm extends React.Component {
  constructor(props) {
    super();
    this.state = { category: Object.assign({}, props.category) };
    this.validator = new FormValidator(this.validationSchema);
  }

  validationSchema = {
    categoryTypeId: { presence: true },
    name: { presence: true },
  };

  handleCategoryTypeChange = (categoryTypeId) => {
    this.handleChange({ target: { name: 'categoryTypeId', value: categoryTypeId } });
  };

  handleChange = (event) => {
    const category = this.state.category;
    category[event.target.name] = event.target.value;
    this.setState({ category });
    this.validator.validateField(event.target.name, event.target.value);
  };

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
        <FormControl name="categoryTypeId" validator={this.validator} label="Category Type">
          <DropDown
            name="categoryTypeId"
            value={this.state.category.categoryTypeId}
            options={this.props.categoryTypes}
            onChange={this.handleCategoryTypeChange}
          />
        </FormControl>
        <FormControl name="name" validator={this.validator} label="Name">
          <input
            className="form-control"
            name="name"
            type="text"
            value={this.state.category.name || ''}
            onChange={this.handleChange}
          />
        </FormControl>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string,
    categoryTypeId: React.PropTypes.number,
  }).isRequired,
  categoryTypes: React.PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

