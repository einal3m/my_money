

import React from 'react';
import DatePicker from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import FormValidator from '../../util/form-validator';

export default class SavingsAccountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      account: {
        accountType: 'savings',
        name: '',
        bank: '',
        openingBalance: 0,
        openingBalanceDate: moment().format('YYYY-MM-DD'),
      },
    };

    this.validator = new FormValidator(this.validationSchema());
  }

  validationSchema() {
    return {
      name: { presence: true },
      openingBalance: { presence: true, numericality: true },
      openingBalanceDate: { presence: true, datetime: { dateOnly: true } },
    };
  }

  handleDateChange(date) {
    if (date === 'Invalid date') {
      date = '';
    }
    this.handleChange({ target: { name: 'openingBalanceDate', value: date } });
  }

  handleChange(event) {
    const account = this.state.account;
    account[event.target.name] = event.target.value;
    this.setState({ account });

    this.validator.validateField(event.target.name, event.target.value);
  }

  isValid() {
    return !this.validator.validateAll(this.state.account);
  }

  getAccount() {
    return this.state.account;
  }

  render() {
    return (
      <div>
        <div className={`form-group ${this.validator.errorState('name')}`}>
          <label className="control-label">Name</label>
          <input className="form-control" name="name" type="text" value={this.state.account.name}
            onChange={this.handleChange.bind(this)} ref="nameField"
          />
          <div className="help-block">{this.validator.errorFor('name')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('bank')}`}>
          <label className="control-label">Bank</label>
          <input className="form-control" name="bank" type="text" value={this.state.account.bank}
            onChange={this.handleChange.bind(this)} ref="bankField"
          />
          <div className="help-block">{this.validator.errorFor('bank')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('openingBalance')}`}>
          <label className="control-label">Opening Balance</label>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input className="form-control" name="openingBalance" type="text" value={this.state.account.openingBalance}
              onChange={this.handleChange.bind(this)} ref="openingBalanceField"
            />
          </div>
          <div className="help-block">{this.validator.errorFor('openingBalance')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('openingBalanceDate')}`}>
          <label className="control-label">Opening Balance Date</label>
          <DatePicker name="openingBalanceDate" dateTime={this.state.account.openingBalanceDate}
            format="YYYY-MM-DD" inputFormat="DD-MMM-YYYY" showToday mode="date"
            onChange={this.handleDateChange.bind(this)} ref="openingBalanceDateField"
          />
          <div className="help-block">{this.validator.errorFor('openingBalanceDate')}</div>
        </div>
      </div>
    );
  }
}
