import React from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../../util/form-validator';
import FormControl from '../common/controls/FormControl';
import Select from '../common/controls/Select';

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
    return this.validator.isValid(this.state.category);
  }

  getModel() {
    return this.state.category;
  }

  render() {
    return (
      <div>
        <FormControl name="categoryTypeId" validator={this.validator} label="Category Type">
          <Select
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
  category: PropTypes.shape({
    name: PropTypes.string,
    categoryTypeId: PropTypes.number,
  }).isRequired,
  categoryTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

