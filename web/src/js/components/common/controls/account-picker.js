import React, { PropTypes } from 'react';
import Select from './select';

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
      <div className="picker form-horizontal">
        <div className="form-group">
          <label htmlFor="account-dropdown" className="control-label col-xs-4">Accounts</label>
          <div className="col-xs-8">
            <Select
              name="accountId"
              value={this.props.value}
              groupedOptions={this.groupedOptions()}
              multiple={!!this.props.multiple}
              onChange={this.handleSelect}
            />
          </div>
        </div>
      </div>
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
