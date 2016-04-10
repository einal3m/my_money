import React from 'react';

export default class GroupedCategorySelect extends React.Component {

  handleChange(event) {
    this.props.onChange({target: {name: event.target.name, value: Number(event.target.value)}});
  }

  sortedCategories(categories) {
    return categories.sort((a, b) => {
      let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    });
  }

  renderBlankOption() {
    if (!this.props.value) {
      return <option value='0' disabled>Please select...</option>;
    }
  }

  renderCategories(categories) {
      return categories.map(category => {
        return <option key={`cat_${category.id}`} value={category.id}>{category.name}</option>;
      });
  }

  renderCategoryTypes() {
    return this.props.groupedCategories.map(categoryType => {
      return (
        <optgroup key={`catType_${categoryType.categoryType.id}`} label={categoryType.categoryType.name}>
          {this.renderCategories(this.sortedCategories(categoryType.categories))}
        </optgroup>
      );
    });
  }

  render() {
    return (
      <select ref='select' className="form-control" name="categoryId" value={this.props.value || '0'} 
          onChange={this.handleChange.bind(this)}>
        {this.renderBlankOption()}
        {this.renderCategoryTypes()}
      </select>         
    );
  }
}

GroupedCategorySelect.propTypes = {
  value: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired,
  groupedCategories: React.PropTypes.array.isRequired
};
