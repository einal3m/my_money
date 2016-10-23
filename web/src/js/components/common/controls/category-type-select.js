import React from 'react';

export default class CategoryTypeSelect extends React.Component {

  handleChange(event) {
    this.props.onChange({ target: { name: event.target.name, value: Number(event.target.value) } });
  }

  renderBlankOption() {
    if (!this.props.value) {
      return <option value="0" disabled>Please select...</option>;
    }
  }

  renderOptions() {
    return this.props.categoryTypes.map((categoryType) => {
      return <option key={categoryType.id} value={categoryType.id}>{categoryType.name}</option>;
    });
  }

  render() {
    return (
      <select ref="select" className="form-control" name="categoryTypeId" value={this.props.value || '0'}
        onChange={this.handleChange.bind(this)}
      >
        {this.renderBlankOption()}
        {this.renderOptions()}
      </select>
    );
  }
}

CategoryTypeSelect.propTypes = {
  value: React.PropTypes.number,
  categoryTypes: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
