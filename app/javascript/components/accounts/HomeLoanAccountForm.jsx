import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../common/date-picker/DatePicker';
import FormControl from '../common/controls/FormControl';
import MoneyInput from '../common/controls/MoneyInput';
import FormValidator from '../../util/form-validator';

export default class HomeLoanAccountForm extends React.Component {
  constructor(props) {
    super();
    this.state = { account: Object.assign(this.defaultModelProperties, props.account) };
    this.validator = new FormValidator(this.validationSchema);
  }

  defaultModelProperties = {
    accountType: 'loan',
  };

  validationSchema = {
    name: { presence: true },
    limit: { presence: true, numericality: true },
    term: { presence: true, numericality: true },
    interestRate: { presence: true, numericality: true },
    openingBalanceDate: { presence: true, datetime: { dateOnly: true } },
  };

  handleDateChange = (date) => {
    let changedDate = date;
    if (date === 'Invalid date') {
      changedDate = '';
    }
    this.handleChange({ target: { name: 'openingBalanceDate', value: changedDate } });
  };

  handleChange = (event) => {
    const account = this.state.account;
    account[event.target.name] = event.target.value;
    this.setState({ account });

    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    this.forceUpdate();
    return !this.validator.validateAll(this.state.account);
  }

  getModel() {
    return this.state.account;
  }

  render() {
    return (
      <div className="form">
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
        <FormControl name="limit" validator={this.validator} label="Amount Borrowed">
          <MoneyInput
            name="limit"
            value={this.state.account.limit || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <div className="flex-group-row">
          <FormControl name="term" validator={this.validator} label="Term">
            <div className="input-group">
              <input
                className="form-control"
                name="term"
                type="text"
                value={this.state.account.term || ''}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">years</div>
              </div>
            </div>
          </FormControl>
          <FormControl name="interestRate" validator={this.validator} label="Interest Rate">
            <div className="input-group">
              <input
                className="form-control"
                name="interestRate"
                type="text"
                value={this.state.account.interestRate || ''}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">%</div>
              </div>
            </div>
          </FormControl>
        </div>
        <FormControl name="openingBalanceDate" validator={this.validator} label="Opening Date">
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

HomeLoanAccountForm.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bank: PropTypes.string,
    limit: PropTypes.number,
    term: PropTypes.number,
    interestRate: PropTypes.number,
    openingBalanceDate: PropTypes.string,
  }).isRequired,
};
