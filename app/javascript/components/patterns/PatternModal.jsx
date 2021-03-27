import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormModal from '../common/FormModal';
import PatternForm from './PatternForm';
import { groupedCategories } from '../../selectors/category-selector';
import { savePattern, deletePattern } from '../../actions/pattern-actions';

export class PatternModalComponent extends React.Component {

  handleSave = (model) => {
    savePattern(model);
  };

  handleDelete = () => {
    deletePattern(this.props.model);
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
          <PatternForm pattern={this.props.model} groupedCategories={this.props.groupedCategories} />
        </FormModal>
      );
    }
    return <div />;
  }

}

PatternModalComponent.propTypes = {
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

export default connect(mapStateToProps)(PatternModalComponent);
