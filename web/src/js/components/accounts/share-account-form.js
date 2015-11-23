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

export default class ShareAccountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      account: {
        accountType: 'share',
        name: null,
        ticker: null
      },
      errors: []
    }
  }

  validationSchema(field) {
    let schema = {
      ticker: { presence: true},
      name: { presence: true}
    };

    if (field) {
      let singleValidation = {};
      singleValidation[field] = schema[field];
      return singleValidation;
    }
    return schema; 
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
        <div className={`form-group ${this.validState('ticker')}`}>
          <label className='control-label'>Ticker</label>
          <input className='form-control' name='ticker' type='text' value={this.state.account.ticker} 
            onChange={this.handleChange.bind(this)} ref='tickerField' />
          <div className='help-block'>{this.errorFor('ticker')}</div>
        </div>
        <div className={`form-group ${this.validState('name')}`}>
          <label className='control-label'>Name</label>
          <input className='form-control' name='name' type='text' value={this.state.account.name} 
            onChange={this.handleChange.bind(this)} ref='nameField' />
          <div className='help-block'>{this.errorFor('name')}</div>
        </div>
      </div>
    );
  }
}
