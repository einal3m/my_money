import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormModal from '../common/form-modal';
import BudgetForm from './budget-form';
import { saveBudget, deleteBudget } from '../../actions/budget-actions';

export class BudgetModalComponent extends React.Component {

  handleSave = (model) => {
    saveBudget(model);
  };

  handleDelete = () => {
    deleteBudget(this.props.model);
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
          <BudgetForm budget={this.props.model} />
        </FormModal>
      );
    }
    return <div />;
  }

}

BudgetModalComponent.propTypes = {
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

export default connect(mapStateToProps)(BudgetModalComponent);
