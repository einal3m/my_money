import React, { PropTypes } from 'react';
import DropDown from './drop-down';

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
      <DropDown value={this.props.value} groupedOptions={this.groupedOptions()} onChange={this.handleChange} />
    );
  }
}

GroupedCategorySelect.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
