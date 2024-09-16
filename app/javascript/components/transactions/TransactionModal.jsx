import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormModal from '../common/FormModal';
import BankTransactionForm from './BankTransactionForm';
import { groupedCategories } from '../../selectors/category-selector';
import { saveTransaction, deleteTransaction } from '../../actions/transaction-actions';

export class TransactionModalComponent extends React.Component {

  handleSave = (model) => {
    saveTransaction(model);
  };

  handleDelete = () => {
    deleteTransaction(this.props.model);
  };

  render() {
    if (this.props.show) {
      return (
        <FormModal
          show
          modelName={this.props.modelType}
          allowDelete={this.props.allowDelete}
          onSave={this.handleSave}
          onDelete={this.handleDelete}
        >
          <BankTransactionForm
            accounts={this.props.accounts}
            transaction={this.props.model}
            groupedCategories={this.props.groupedCategories}
            matchLoading={this.props.matchLoading}
            matchingTransactions={this.props.matchingTransactions}
          />
        </FormModal>
      );
    }
    return <div />;
  }
}

TransactionModalComponent.propTypes = {
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  show: PropTypes.bool.isRequired,
  modelType: PropTypes.string,
  model: PropTypes.shape({}),
  allowDelete: PropTypes.bool,
  matchLoading: PropTypes.bool.isRequired,
  matchingTransactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function mapStateToProps(state) {
  return {
    accounts: state.accountStore.get('accounts').toJS(),
    groupedCategories: groupedCategories(state).toJS(),
    show: state.formStore.show,
    modelType: state.formStore.modelType,
    model: state.formStore.model,
    allowDelete: state.formStore.allowDelete,
    matchLoading: state.matchingTransactionStore.get('loading'),
    matchingTransactions: state.matchingTransactionStore.get('matchingTransactions').toJS(),
  };
}

export default connect(mapStateToProps)(TransactionModalComponent);
