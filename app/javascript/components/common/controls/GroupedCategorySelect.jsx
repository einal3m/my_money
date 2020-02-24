import React, { PropTypes } from 'react';
import Select from './select';

export default class GroupedCategorySelect extends React.Component {

  handleChange = (id) => {
    this.props.onChange({ target: { name: 'categoryId', value: id } });
  };

  groupedOptions() {
    return this.props.groupedCategories.map(group => ({
      name: group.categoryType.name,
      options: group.categories,
    }));
  }

  render() {
    return (
      <Select
        name="categoryId"
        value={this.props.value}
        allowUnassigned={this.props.allowUnassigned}
        groupedOptions={this.groupedOptions()}
        onChange={this.handleChange}
      />
    );
  }
}

GroupedCategorySelect.propTypes = {
  value: PropTypes.number,
  allowUnassigned: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};