'use strict';

import {connect} from 'react-redux';
import React from 'react';
import PageHeader from '../common/page-header';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';
import CategoryTypeTable from './category-type-table';
import FormModal from '../common/form-modal';
import CategoryForm from './category-form';
import SubcategoryForm from './subcategory-form';
import categoryActions from '../../actions/category-actions';
import categorySelector from '../../selectors/category-selector';
import { toJS } from 'immutable';
require("../../../css/common.scss");
require("../../../css/categories.scss");

export class CategoryList extends React.Component {
  constructor() {
    super();
    categoryActions.getCategories();
    this.state = { showModal: false };
  }

  newModel(event, eventKey) {
    if (eventKey === 'category') {
      this.setState({ showModal: true, modalType: 'Category', category: {}, allowDelete: false });
    } else {
      this.setState({ showModal: true, modalType: 'Subcategory', subcategory: {}, allowDelete: false });
    }
  }

  editCategory(category) {
    this.setState({ showModal: true, modalType: 'Category', category: category, allowDelete: true});
  }

  editSubcategory(subcategory) {
    this.setState({ showModal: true, modalType: 'Subcategory', subcategory: subcategory, allowDelete: true});
  }

  handleSaveCategory(category) {
    if (category.id) {
      categoryActions.updateCategory(category);
    } else {
      categoryActions.createCategory(category);
    }
  }

  handleSaveSubcategory(subcategory) {
    categoryActions.handleSaveSubcategory(subcategory);
  }

  handleSave(model) {
    if (this.state.modalType === 'Category') {
      categoryActions.saveCategory(model);
    } else {
      categoryActions.saveSubcategory(model);
    }
  }

  handleDelete(modelId) {
    if (this.state.modalType === 'Category') {
      categoryActions.deleteCategory(modelId);
    } else {
      categoryActions.deleteSubcategory(modelId);
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  renderCategoryTypes() {
    if (this.props.loaded) {
      return this.props.groupedCategories.map(group => {
        let categoryTypeCode = group.categoryType.code;
        return (
          <div key={categoryTypeCode} className='col-sm-6'>
            <CategoryTypeTable categoryType={group.categoryType} 
              categories={group.categories}
              editCategory={this.editCategory.bind(this)} 
              editSubcategory={this.editSubcategory.bind(this)} />
          </div>
        );
      });
    }
  }

  renderNewCategoryButtons() {
    return (
      <Dropdown id='new-category' pullRight onSelect={this.newModel.bind(this)} ref='newButton'>
        <Dropdown.Toggle>
          <Glyphicon glyph='plus' /> New
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem key='1' eventKey='category'>New Category</MenuItem>
          <MenuItem key='2' eventKey='subcategory'>New Subcategory</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderForm() {
    if (this.state.modalType === 'Category') {
      let categoryTypes = this.props.groupedCategories.map(categoryType => categoryType.categoryType);
      return <CategoryForm categoryTypes={categoryTypes} category={this.state.category} />
    } else {
      return <SubcategoryForm groupedCategories={this.props.groupedCategories} subcategory={this.state.subcategory}/>
    }
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <FormModal ref='modal' show onClose={this.closeModal.bind(this)} onSave={this.handleSave.bind(this)}
                   modelName={this.state.modalType} allowDelete={this.state.allowDelete}
                   onDelete={this.handleDelete.bind(this)}>
          {this.renderForm()}
        </FormModal>
      );
    }
  }

  render() {
    return (
      <div>
        <PageHeader title="my categories">
          {this.renderNewCategoryButtons()}
        </PageHeader>

        <div className="container">
          <div className='row category-list'>
            {this.renderCategoryTypes()}
          </div>
        </div>

        {this.renderModal()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.categoryStore.get('categoriesLoaded') && 
            state.categoryStore.get('categoryTypesLoaded') && 
            state.categoryStore.get('subcategoriesLoaded'),
    groupedCategories: categorySelector(state).toJS()
  };
}

export default connect(mapStateToProps)(CategoryList);
