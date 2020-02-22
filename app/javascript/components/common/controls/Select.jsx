import React, { PropTypes } from 'react';
import ReactSelect from 'react-select-plus';

export default class Select extends React.Component {

  handleSelect = (value) => {
    let id;
    if (this.props.multiple) {
      id = value.map(option => option.value);
    } else {
      id = value ? value.value : null;
    }
    this.props.onChange(id);
  };

  options = options => options.map(option => ({ value: option.id, label: option.name }));

  optionsOrGroupedOptions = () => {
    if (this.props.options) {
      return this.options(this.props.options);
    }

    if (this.props.groupedOptions) {
      return this.props.groupedOptions.map(group => (
        { label: group.name, options: this.options(group.options) }
      ));
    }

    return [];
  };

  render() {
    return (
      <ReactSelect
        name={this.props.name}
        value={this.props.value}
        clearable={!!this.props.allowUnassigned}
        placeholder={this.props.allowUnassigned ? 'Un-assigned' : 'Please select...'}
        multi={this.props.multiple}
        options={this.optionsOrGroupedOptions()}
        onChange={this.handleSelect}
      />
    );
  }
}

const optionsProp = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}));

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  options: optionsProp,
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: optionsProp,
  })),
  multiple: PropTypes.bool,
  allowUnassigned: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
