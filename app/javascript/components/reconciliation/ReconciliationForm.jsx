import React, { PropTypes } from 'react';
import FormValidator from '../../util/form-validator';
import FormControl from '../common/controls/form-control';
import DatePicker from '../common/date-picker/date-picker';
import MoneyInput from '../common/controls/money-input';
import { accountNameAndBank } from '../../util/text-util';

export default class ReconciliationForm extends React.Component {

  constructor(props) {
    super();
    this.state = { reconciliation: props.reconciliation };
    this.validator = new FormValidator(this.validationSchema);
  }

  validationSchema = {
    statementDate: { presence: true, datetime: { dateOnly: true } },
    statementBalance: { presence: true, numericality: true },
  };

  handleDateChange = (date) => {
    this.handleChange({ target: { name: 'statementDate', value: date } });
  };

  handleChange = (event) => {
    const reconciliation = this.state.reconciliation;
    reconciliation[event.target.name] = event.target.value;
    this.setState({ reconciliation });
    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    this.forceUpdate();
    return !this.validator.validateAll(this.state.reconciliation);
  }

  getModel() {
    return this.state.reconciliation;
  }

  render() {
    return (
      <div>
        <FormControl name="accountName" validator={this.validator} label="Account">
          <div>{accountNameAndBank(this.props.account)}</div>
        </FormControl>
        <FormControl name="statementDate" validator={this.validator} label="Statement Date">
          <DatePicker
            name="statementDate"
            value={this.state.reconciliation.statementDate}
            onChange={this.handleDateChange}
          />
        </FormControl>
        <FormControl name="statementBalance" validator={this.validator} label="Statement Balance">
          <MoneyInput
            name="statementBalance"
            value={this.state.reconciliation.statementBalance || ''}
            onChange={this.handleChange}
          />
        </FormControl>
      </div>
    );
  }
}

ReconciliationForm.propTypes = {
  account: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  reconciliation: PropTypes.shape({
    id: PropTypes.number,
    accountId: PropTypes.number,
    statementDate: PropTypes.string,
    statementBalance: PropTypes.number,
    reconciled: PropTypes.bool,
  }).isRequired,
};
