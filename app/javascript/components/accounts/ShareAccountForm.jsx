import React from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../../util/form-validator';
import FormControl from '../common/controls/FormControl';

export default class ShareAccountForm extends React.Component {
  constructor(props) {
    super();
    this.state = { account: Object.assign(this.defaultModelProperties, props.account) };
    this.validator = new FormValidator(this.validationSchema);
  }

  defaultModelProperties = {
    accountType: 'share',
  };

  validationSchema = {
    ticker: { presence: true },
    name: { presence: true },
  };

  handleChange = (event) => {
    const account = this.state.account;
    account[event.target.name] = event.target.value;
    this.setState({ account });
    this.validator.validateField(event.target.name, event.target.value);
  };

  isValid() {
    this.forceUpdate();
    return this.validator.isValid(this.state.account);
  }

  getModel() {
    return this.state.account;
  }

  render() {
    return (
      <div className="form">
        <FormControl name="ticker" validator={this.validator} label="Ticker">
          <input
            className="form-control"
            name="ticker"
            type="text"
            value={this.state.account.ticker || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="name" validator={this.validator} label="Name">
          <input
            className="form-control"
            name="name"
            type="text"
            value={this.state.account.name || ''}
            onChange={this.handleChange}
          />
        </FormControl>
      </div>
    );
  }
}

ShareAccountForm.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    ticker: PropTypes.string,
  }).isRequired,
};
