import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormModal from '../common/form-modal';
import SavingsAccountForm from './savings-account-form';
import ShareAccountForm from './share-account-form';
import { saveAccount, deleteAccount } from '../../actions/account-actions';

export class AccountModalComponent extends React.Component {

  handleSave = (model) => {
    saveAccount(model);
  };

  handleDelete = (modelId) => {
    deleteAccount(modelId);
  };

  renderForm() {
    if (this.props.modelType === 'Share Account') {
      return <ShareAccountForm account={this.props.model} />;
    }
    return <SavingsAccountForm account={this.props.model} />;
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
        >{this.renderForm()}</FormModal>
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
