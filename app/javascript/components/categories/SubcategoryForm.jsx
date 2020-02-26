import React from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../../util/form-validator';
import GroupedCategorySelect from '../common/controls/GroupedCategorySelect';
import FormControl from '../common/controls/FormControl';

export default class SubcategoryForm extends React.Component {

  constructor(props) {
    super();
    this.state = { subcategory: Object.assign({}, props.subcategory) };
    this.validator = new FormValidator(this.validationSchema);
  }

  validationSchema = {
    name: { presence: true },
    categoryId: { presence: true },
  };

  handleChange = (event) => {
    const subcategory = this.state.subcategory;
    subcategory[event.target.name] = event.target.value;
    this.setState({ subcategory });
    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    this.forceUpdate();
    return this.validator.isValid(this.state.subcategory);
  }

  getModel() {
    return this.state.subcategory;
  }

  render() {
    return (
      <div>
        <FormControl name="categoryId" validator={this.validator} label="Category">
          <GroupedCategorySelect
            name="categoryId"
            value={this.state.subcategory.categoryId}
            groupedCategories={this.props.groupedCategories}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="name" validator={this.validator} label="Name">
          <input
            className="form-control"
            name="name"
            type="text"
            value={this.state.subcategory.name || ''}
            onChange={this.handleChange}
          />
        </FormControl>
      </div>
    );
  }
}

SubcategoryForm.propTypes = {
  subcategory: PropTypes.shape({
    name: PropTypes.string,
    categoryId: PropTypes.number,
  }).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
