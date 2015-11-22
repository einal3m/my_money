'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-datetimepicker'
import validator from 'validate.js';
import moment from 'moment';


validator.extend(validator.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

validator.validators.presence.options = {message: "is required"};

export default class SavingsAccountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      account: {
        name: null,
        bank: null,
        openingBalance: 0,
        openingBalanceDate: moment().format('YYYY-MM-DD')
      },
      errors: []
    }
  }

  validationSchema(field) {
    let schema = {
      name: { presence: true},
      openingBalance: {presence: true, numericality: true},
      openingBalanceDate: {presence: true, datetime: {dateOnly: true}}
    };

    if (field) {
      let singleValidation = {};
      singleValidation[field] = schema[field];
      return singleValidation;
    }
    return schema; 
  }

  handleDateChange(date) {
    this.handleChange({target: {name: 'openingBalanceDate', value: date}});
  }

  handleChange(event) {
    let account = this.state.account;
    account[event.target.name] = event.target.value;
    this.setState({account: account});

    let validationField = {};
    validationField[event.target.name] = event.target.value;
    let validationRule = this.validationSchema(event.target.name);
    let error = validator.validate(validationField, validationRule);

    let errors = this.state.errors;
    if (error) {
      errors[event.target.name] = error[event.target.name];
      this.setState({errors: errors});
    } else {
      delete errors[event.target.name];      
    }
  }

  errorFor(field) {
    if (this.state.errors[field]) {
      return this.state.errors[field][0];
    }
  }

  validState(field) {
    if (this.state.errors[field]) {
      return 'has-error';
    }
    return 'has-success';
  }

  validateAll() {
    let errors = validator.validate(this.state.account, this.validationSchema());
    this.setState({errors: errors});
    return !errors;
  }

  getAccount() {
    return this.state.account;
  }

  render() {
    return (
      <div>
        <div className={`form-group ${this.validState('name')}`}>
          <label className='control-label'>Name</label>
          <input className='form-control' name='name' type='text' value={this.state.account.name} 
            onChange={this.handleChange.bind(this)} ref='nameField' />
          <div className='help-block'>{this.errorFor('name')}</div>
        </div>
        <div className={`form-group ${this.validState('bank')}`}>
          <label className='control-label'>Bank</label>
          <input className='form-control' name='bank' type='text' value={this.state.account.bank} 
            onChange={this.handleChange.bind(this)} ref='bankField' />
          <div className='help-block'>{this.errorFor('bank')}</div>
        </div>
        <div className={`form-group ${this.validState('openingBalance')}`}>
          <label className='control-label'>Opening Balance</label>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input className='form-control' name='openingBalance' type='text' value={this.state.account.openingBalance} 
              onChange={this.handleChange.bind(this)} ref='openingBalanceField' />
          </div>
          <div className='help-block'>{this.errorFor('openingBalance')}</div>
        </div>
        <div className={`form-group ${this.validState('openingBalanceDate')}`}>
          <label className='control-label'>Opening Balance Date</label>
          <DatePicker name='openingBalanceDate' dateTime={this.state.account.openingBalanceDate}
            format='YYYY-MM-DD' inputFormat='DD-MMM-YYYY' showToday mode='date'
            onChange={this.handleDateChange.bind(this)} ref='openingBalanceDateField' />
          <div className='help-block'>{this.errorFor('openingBalanceDate')}</div>
        </div>
      </div>
    );
  }
}
