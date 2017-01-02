import React, { PropTypes } from 'react';
import moment from 'moment';
import { Tabs, Tab } from 'react-bootstrap';
import DatePicker from '../common/date-picker/date-picker';
import FormValidator from '../../util/form-validator';
import FormControl from '../common/controls/form-control';
import GroupedCategorySelect from '../common/controls/grouped-category-select';
import MatchingTransactionSelect from '../common/controls/matching-transaction-select';
import SubcategoryPicker from '../common/controls/subcategory-picker';
import MoneyInput from '../common/controls/money-input';
import { getMatchingTransactions } from '../../actions/matching-transactions-actions';
import { transferTo, memoAndNotes } from '../../util/text-util';

export default class BankTransactionForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      transaction: Object.assign({
        date: moment().format('YYYY-MM-DD'),
        transactionType: 'bank_transaction',
      }, props.transaction),
      isTransfer: !!props.transaction.matchingTransaction,
    };
    this.validator = new FormValidator(this.validationSchema);
  }

  componentDidMount() {
    getMatchingTransactions(this.state.transaction.id);
  }

  validationSchema = {
    date: { presence: true, datetime: { dateOnly: true } },
    amount: { presence: true, numericality: true },
  };

  handleDateChange = (date) => {
    let changedDate = date;
    if (date === 'Invalid date') {
      changedDate = '';
    }
    this.changeTransaction('date', changedDate);
  };

  handleSubcategoryChange = (subcategoryId) => {
    this.changeTransaction('subcategoryId', subcategoryId);
  };

  handleMatchingTransactionChange = (matchingTransactionId) => {
    const matchingTransaction = this.props.matchingTransactions.filter(
      transaction => transaction.id === matchingTransactionId
    )[0];

    this.changeTransaction('matchingTransaction', matchingTransaction);
    this.changeTransaction('matchingTransactionId', matchingTransactionId);
  };

  clearMatchingTransaction = () => {
    this.changeTransaction('matchingTransaction', null);
    this.changeTransaction('matchingTransactionId', null);
  };

  changeTransaction(name, value) {
    this.handleChange({ target: { name, value } });
  }

  handleCategoryChange = (event) => {
    this.handleSubcategoryChange(null);
    this.handleChange(event);
  };

  handleChange = (event) => {
    const transaction = this.state.transaction;
    transaction[event.target.name] = event.target.value;
    this.setState({ transaction });
    this.validator.validateField(event.target.name, event.target.value);
  };

  handleChangeTab = (eventKey) => {
    this.setState({ isTransfer: eventKey === 'transfer' });
  };

  isValid() {
    this.forceUpdate();
    return !this.validator.validateAll(this.state.transaction);
  }

  getModel() {
    const model = this.state.transaction;
    if (this.state.isTransfer) {
      model.categoryId = null;
      model.subcategoryId = null;
    } else {
      model.matchedTransactionId = null;
      model.matchedTransaction = null;
    }
    return model;
  }

  renderSubcategoryPicker() {
    if (!this.state.transaction.categoryId) {
      return <div />;
    }
    return (
      <FormControl name="subcategoryId" validator={this.validator} label="Subcategory">
        <SubcategoryPicker
          name="subcategoryId"
          groupedCategories={this.props.groupedCategories}
          categoryId={this.state.transaction.categoryId}
          onChange={this.handleSubcategoryChange}
          value={this.state.transaction.subcategoryId}
        />
      </FormControl>
    );
  }

  renderCurrentMatchingTransaction() {
    if (!this.state.transaction.matchingTransaction) return <div />;

    return (
      <div>
        <div>{transferTo(this.state.transaction.matchingTransaction, this.props.accounts)}</div>
        <div>Description: {memoAndNotes(this.state.transaction.matchingTransaction)}</div>
        <i className="fa fa-times-circle" onClick={this.clearMatchingTransaction} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <FormControl name="date" validator={this.validator} label="Date">
          <DatePicker
            name="date"
            value={this.state.transaction.date}
            onChange={this.handleDateChange}
          />
        </FormControl>
        <FormControl name="amount" validator={this.validator} label="Amount">
          <MoneyInput
            name="amount"
            value={this.state.transaction.amount || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl name="notes" validator={this.validator} label="Notes">
          <input
            className="form-control"
            name="notes"
            type="text"
            value={this.state.transaction.notes || ''}
            onChange={this.handleChange}
          />
        </FormControl>
        <Tabs id="myTab" activeKey={this.state.isTransfer ? 'transfer' : 'category'} onSelect={this.handleChangeTab}>
          <Tab title="Category" eventKey="category">
            <FormControl name="categoryId" validator={this.validator} label="Category">
              <GroupedCategorySelect
                name="categoryId"
                value={this.state.transaction.categoryId}
                allowUnassigned
                groupedCategories={this.props.groupedCategories}
                onChange={this.handleCategoryChange}
              />
            </FormControl>
            {this.renderSubcategoryPicker()}
          </Tab>
          <Tab title="Transfer" eventKey="transfer">
            {this.renderCurrentMatchingTransaction()}
            <FormControl name="matchingTransactionId" validator={this.validator} label="Matching Transactions">
              <MatchingTransactionSelect
                name="matchingTransactionId"
                value={this.state.transaction.matchingTransactionId}
                accounts={this.props.accounts}
                matchingTransactions={this.props.matchingTransactions}
                loading={this.props.matchLoading}
                allowUnassigned
                onChange={this.handleMatchingTransactionChange}
              />
            </FormControl>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

BankTransactionForm.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    memo: PropTypes.string,
    notes: PropTypes.string,
    amount: PropTypes.number,
    balance: PropTypes.number,
    categoryId: PropTypes.number,
    subcategoryId: PropTypes.number,
    matchingTransactionId: PropTypes.number,
    matchingTransaction: PropTypes.shape({}),
  }).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groupedCategories: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  matchLoading: PropTypes.bool.isRequired,
  matchingTransactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
