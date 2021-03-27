import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormModal from '../common/FormModal';
import CategoryForm from './CategoryForm';
import SubcategoryForm from './SubcategoryForm';
import categoryActions from '../../actions/category-actions';

export class CategoryModalComponent extends React.Component {

  handleSave = (model) => {
    if (this.props.modelType === 'Category') {
      categoryActions.saveCategory(model);
    } else {
      categoryActions.saveSubcategory(model);
    }
  };

  handleDelete = (modelId) => {
    if (this.props.modelType === 'Category') {
      categoryActions.deleteCategory(modelId);
    } else {
      categoryActions.deleteSubcategory(modelId);
    }
  };

  renderForm() {
    if (this.props.modelType === 'Category') {
      const categoryTypes = this.props.groupedCategories.map(categoryType => categoryType.categoryType);
      return <CategoryForm categoryTypes={categoryTypes} category={this.props.model} />;
    }
    return <SubcategoryForm groupedCategories={this.props.groupedCategories} subcategory={this.props.model} />;
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

CategoryModalComponent.propTypes = {
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

export default connect(mapStateToProps)(CategoryModalComponent);
