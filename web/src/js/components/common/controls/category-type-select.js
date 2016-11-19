import React, { PropTypes } from 'react';

export default class CategoryTypeSelect extends React.Component {

  handleChange = (event) => {
    this.props.onChange({ target: { name: event.target.name, value: Number(event.target.value) } });
  };

  renderBlankOption() {
    if (!this.props.value) {
      return <option value="0" disabled>Please select...</option>;
    }
    return undefined;
  }

  renderOptions() {
    return this.props.categoryTypes.map(categoryType => (
      <option key={categoryType.id} value={categoryType.id}>{categoryType.name}</option>
    ));
  }

  render() {
    return (
      <select
        className="form-control"
        name="categoryTypeId"
        value={this.props.value || '0'}
        onChange={this.handleChange}
      >
        {this.renderBlankOption()}
        {this.renderOptions()}
      </select>
    );
  }
}

CategoryTypeSelect.propTypes = {
  value: PropTypes.number,
  categoryTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
};
