import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormModal from '../common/form-modal';
import BankTransactionForm from './bank-transaction-form';
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
          <BankTransactionForm transaction={this.props.model} groupedCategories={this.props.groupedCategories} />
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
};

function mapStateToProps(state) {
  return {
    groupedCategories: groupedCategories(state).toJS(),
    show: state.formStore.get('show'),
    modelType: state.formStore.get('modelType'),
    model: state.formStore.get('model').toJS(),
    allowDelete: state.formStore.get('allowDelete'),
  };
}

export default connect(mapStateToProps)(TransactionModalComponent);
