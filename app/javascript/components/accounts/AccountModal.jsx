import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormModal from '../common/FormModal';
import SavingsAccountForm from './SavingsAccountForm';
import ShareAccountForm from './ShareAccountForm';
import HomeLoanAccountForm from './HomeLoanAccountForm';
import { saveAccount, deleteAccount } from '../../actions/account-actions';

export class AccountModalComponent extends React.Component {

  handleSave = (model) => {
    saveAccount(model);
  };

  handleDelete = (modelId) => {
    deleteAccount(modelId);
  };

  renderForm() {
    switch (this.props.modelType) {
      case 'Share Account':
        return <ShareAccountForm account={this.props.model} />;
      case 'Loan Account':
        return <HomeLoanAccountForm account={this.props.model} />;
      default:
        return <SavingsAccountForm account={this.props.model} />;
    }
  }

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
          {this.renderForm()}
        </FormModal>
      );
    }
    return <div />;
  }
}

AccountModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  modelType: PropTypes.string,
  model: PropTypes.shape({}),
  allowDelete: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    show: state.formStore.get('show'),
    modelType: state.formStore.get('modelType'),
    model: state.formStore.get('model').toJS(),
    allowDelete: state.formStore.get('allowDelete'),
  };
}

export default connect(mapStateToProps)(AccountModalComponent);
