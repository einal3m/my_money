import React from 'react';
import PropTypes from 'prop-types';

import { centsToDollars, dollarsToCents } from 'util/moneyUtil'

export default class MoneyInput extends React.Component {

  handleChange = () => {
    let value;

    if (isNaN(this.input.value) || this.input.value === '') {
      value = this.input.value;
    } else {
      value = dollarsToCents(this.input.value);
    }

    const fakeEvent = { target: { name: this.props.name, value } };
    this.props.onChange(fakeEvent);
  };

  inputValue = () => centsToDollars(this.props.value);

  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">$</div>
        </div>
        <input
          className="form-control"
          name={this.props.name}
          type="text"
          defaultValue={this.inputValue()}
          onBlur={this.handleChange}
          ref={(c) => { this.input = c; }}
        />
      </div>
    );
  }
}

MoneyInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
};
