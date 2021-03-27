import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormModal from '../common/FormModal';
import ReconciliationForm from './ReconciliationForm';
import { saveReconciliation } from '../../actions/reconciliation-actions';

export class ReconciliationModalComponent extends React.Component {

  handleSave = (reconciliation) => {
    saveReconciliation(reconciliation);
  };

  render() {
    if (!this.props.show) {
      return <div />;
    }
    return (
      <FormModal
        show
        modelName="Reconciliation"
        allowDelete={false}
        onSave={this.handleSave}
      >
        <ReconciliationForm account={this.props.account} reconciliation={this.props.reconciliation} />
      </FormModal>
    );
  }
}

ReconciliationModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  reconciliation: PropTypes.shape({}),
  account: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    show: state.formStore.get('show'),
    reconciliation: state.formStore.get('model').toJS(),
  };
}

export default connect(mapStateToProps)(ReconciliationModalComponent);
