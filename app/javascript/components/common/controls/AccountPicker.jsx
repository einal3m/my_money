import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

export default class AccountPicker extends React.Component {

  handleSelect = (value) => {
    this.props.onChange(value);
  };

  groupedOptions = () => {
    const options = [];

    this.props.accountTypes.forEach((accountType) => {
      if (this.props.accountGroups[accountType.code]) {
        options.push({
          name: accountType.name,
          options: this.props.accountGroups[accountType.code],
        });
      }
    });

    return options;
  };

  render() {
    return (
      <React.Fragment>
        <label htmlFor="accountId" className="control-label">Accounts</label>
        <Select
          name="accountId"
          value={this.props.value}
          groupedOptions={this.groupedOptions()}
          multiple={!!this.props.multiple}
          onChange={this.handleSelect}
        />
      </React.Fragment>
    );
  }
}

AccountPicker.propTypes = {
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  accountGroups: PropTypes.shape({}).isRequired,
  accountTypes: PropTypes.arrayOf(PropTypes.shape({ code: PropTypes.string.isRequired })).isRequired,
  onChange: PropTypes.func.isRequired,
};
