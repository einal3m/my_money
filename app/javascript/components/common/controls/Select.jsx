import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const Select = (props) => {

  const handleSelect = (value) => {
    let id;
    if (props.multiple) {
      id = value.map(option => option.value);
    } else {
      id = value ? value.value : null;
    }
    props.onChange(id);
  };

  const toOptions = (options) => options.map(option => ({ value: option.id, label: option.name }));

  const optionsOrGroupedOptions = () => {
    if (props.options) {
      return toOptions(props.options);
    }

    if (props.groupedOptions) {
      return props.groupedOptions.map(group => (
        { label: group.name, options: toOptions(group.options) }
      ));
    }
  };

  const optionForValue = (options, value) => {
    return options.find(option => option.id === value);
  };

  const dropDownValue = () => {
    if (!props.value) return null;

    let option;

    if (props.options) {
      option = optionForValue(props.options, props.value);
    }

    if (props.groupedOptions) {
      const allOptions = props.groupedOptions.map(group => group.options).flat();
      option = optionForValue(allOptions, props.value);
    }

    if (option) {
      return { value: props.value, label: option.name };
    }
  };

  return (
    <ReactSelect
      name={props.name}
      value={dropDownValue()}
      options={optionsOrGroupedOptions()}
      onChange={handleSelect}
      isClearable={!!props.allowUnassigned}
      isMulti={props.multiple}
      placeholder={props.allowUnassigned ? 'Un-assigned' : 'Please select...'}
      className="react-select"
      classNamePrefix="react-select"
    />
  );
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

export default Select;
