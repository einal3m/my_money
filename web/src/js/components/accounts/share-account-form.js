'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-datetimepicker'
import FormValidator from '../../util/form-validator';
import moment from 'moment';

export default class ShareAccountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      account: {
        accountType: 'share',
        name: null,
        ticker: null
      }
    }

    this.validator = new FormValidator(this.validationSchema());
  }

  validationSchema() {
    return {
      ticker: { presence: true},
      name: { presence: true}
    };
  }

  handleChange(event) {
    let account = this.state.account;
    account[event.target.name] = event.target.value;
    this.setState({account: account});

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
        <div className={`form-group ${this.validator.errorState('ticker')}`}>
          <label className='control-label'>Ticker</label>
          <input className='form-control' name='ticker' type='text' value={this.state.account.ticker} 
            onChange={this.handleChange.bind(this)} ref='tickerField' />
          <div className='help-block'>{this.validator.errorFor('ticker')}</div>
        </div>
        <div className={`form-group ${this.validator.errorState('name')}`}>
          <label className='control-label'>Name</label>
          <input className='form-control' name='name' type='text' value={this.state.account.name} 
            onChange={this.handleChange.bind(this)} ref='nameField' />
          <div className='help-block'>{this.validator.errorFor('name')}</div>
        </div>
      </div>
    );
  }
}
