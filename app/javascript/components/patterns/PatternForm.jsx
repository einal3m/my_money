import React from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../../util/form-validator';
import FormControl from '../common/controls/FormControl';
import GroupedCategorySelect from '../common/controls/GroupedCategorySelect';
import SubcategoryPicker from '../common/controls/SubcategoryPicker';

export default class PatternForm extends React.Component {
  constructor(props) {
    super();
    this.state = { pattern: Object.assign({}, props.pattern) };
    this.validator = new FormValidator(this.validationSchema);
  }

  validationSchema = {
    matchText: { presence: true },
    categoryId: { presence: true },
  };

  handleSubcategoryChange = (subcategoryId) => {
    this.handleChange({ target: { name: 'subcategoryId', value: subcategoryId } });
  };

  handleChange = (event) => {
    const pattern = this.state.pattern;
    pattern[event.target.name] = event.target.value;
    this.setState({ pattern });
    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    this.forceUpdate();
    return this.validator.isValid(this.state.pattern);
  }

  getModel() {
    return this.state.pattern;
  }

  renderSubcategoryPicker() {
    if (!this.state.pattern.categoryId) {
      return <div />;
    }
    return (
      <FormControl name="subcategoryId" validator={this.validator} label="Subcategory">
        <SubcategoryPicker
          name="subcategoryId"
          groupedCategories={this.props.groupedCategories}
          categoryId={this.state.pattern.categoryId}
          onChange={this.handleSubcategoryChange}
          value={this.state.pattern.subcategoryId}
        />
      </FormControl>
    );
  }

  render() {
    return (
      <div>
        <FormControl name="matchText" validator={this.validator} label="Match Text">
          <input
            className="form-control"
            name="matchText"
            type="text"
            value={this.state.pattern.matchText || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="notes" validator={this.validator} label="Notes">
          <input
            className="form-control"
            name="notes"
            type="text"
            value={this.state.pattern.notes || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="categoryId" validator={this.validator} label="Category">
          <GroupedCategorySelect
            name="categoryId"
            value={this.state.pattern.categoryId}
            groupedCategories={this.props.groupedCategories}
            onChange={this.handleChange}
          />
        </FormControl>
        {this.renderSubcategoryPicker()}
      </div>
    );
  }
}

PatternForm.propTypes = {
  pattern: PropTypes.shape({
    id: PropTypes.number,
    matchText: PropTypes.string,
    notes: PropTypes.string,
    categoryId: PropTypes.number,
    subcategoryId: PropTypes.number,
  }).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
