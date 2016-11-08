import React, { PropTypes } from 'react';
import moment from 'moment';
import DatePicker from '../common/date-picker/date-picker';
import FormControl from '../common/controls/form-control';
import MoneyInput from '../common/controls/money-input';
import FormValidator from '../../util/form-validator';

export default class SavingsAccountForm extends React.Component {
  constructor(props) {
    super();
    this.state = { account: Object.assign(this.defaultModelProperties, props.account) };
    this.validator = new FormValidator(this.validationSchema);
  }

  defaultModelProperties = {
    accountType: 'savings',
    openingBalance: 0,
    openingBalanceDate: '',
  };

  validationSchema = {
    name: { presence: true },
    openingBalance: { presence: true, numericality: true },
    openingBalanceDate: { presence: true, datetime: { dateOnly: true } },
  };

  handleDateChange = (date) => {
    this.handleChange({ target: { name: 'openingBalanceDate', value: date } });
  };

  handleChange = (event) => {
    const account = this.state.account;
    account[event.target.name] = event.target.value;
    this.setState({ account });

    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    return !this.validator.validateAll(this.state.account);
  }

  getModel() {
    return this.state.account;
  }

  render() {
    return (
      <div>
        <FormControl name="name" validator={this.validator} label="Name">
          <input
            className="form-control"
            name="name"
            type="text"
            value={this.state.account.name || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="bank" validator={this.validator} label="Bank">
          <input
            className="form-control"
            name="bank"
            type="text"
            value={this.state.account.bank || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="openingBalance" validator={this.validator} label="Opening Balance">
          <MoneyInput
            name="openingBalance"
            value={this.state.account.openingBalance}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="openingBalanceDate" validator={this.validator} label="Opening Balance Date">
          <DatePicker
            name="openingBalanceDate"
            value={this.state.account.openingBalanceDate}
            onChange={this.handleDateChange}
          />
        </FormControl>
      </div>
    );
  }
}

SavingsAccountForm.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bank: PropTypes.string,
    openingBalance: PropTypes.number,
    openingBalanceDate: PropTypes.string,
  }).isRequired,
};
