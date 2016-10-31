import React, { PropTypes } from 'react';
import moneyUtil from '../../../util/money-util';

export default class MoneyInput extends React.Component {

  handleChange = () => {
    let value;

    if (isNaN(this.input.value) || this.input.value === '') {
      value = this.input.value;
    } else {
      value = moneyUtil.dollarsToCents(this.input.value);
    }

    const fakeEvent = { target: { name: this.props.name, value } };
    this.props.onChange(fakeEvent);
  };

  inputValue = () => moneyUtil.centsToDollars(this.props.value);

  render() {
    return (
      <div className="input-group">
        <div className="input-group-addon">$</div>
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
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
};
