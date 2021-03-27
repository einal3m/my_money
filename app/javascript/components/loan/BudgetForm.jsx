import React from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../../util/form-validator';
import FormControl from '../common/controls/FormControl';
import MoneyInput from '../common/controls/MoneyInput';

export default class BudgetForm extends React.Component {

  constructor(props) {
    super();
    this.state = { budget: props.budget };
    this.validator = new FormValidator(this.validationSchema);
  }

  validationSchema = {
    description: { presence: true },
    dayOfMonth: { presence: true, numericality: true },
    amount: { presence: true, numericality: true },
  };

  handleChange = (event) => {
    const budget = this.state.budget;
    budget[event.target.name] = event.target.value;
    this.setState({ budget });
    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    this.forceUpdate();
    return this.validator.isValid(this.state.budget);
  }

  getModel() {
    return this.state.budget;
  }

  render() {
    return (
      <div>
        <FormControl name="description" validator={this.validator} label="Description">
          <input
            className="form-control"
            name="description"
            type="text"
            value={this.state.budget.description || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="dayOfMonth" validator={this.validator} label="Day of Month">
          <input
            className="form-control"
            name="dayOfMonth"
            type="text"
            value={this.state.budget.dayOfMonth || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="amount" validator={this.validator} label="Amount">
          <MoneyInput
            name="amount"
            value={this.state.budget.amount || ''}
            onChange={this.handleChange}
          />
        </FormControl>
      </div>
    );
  }
}

BudgetForm.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    dayOfMonth: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
};
