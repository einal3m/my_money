'use strict';

import {connect} from 'react-redux';
import React from 'react';
import PageHeader from '../common/page-header';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';
import CategoryTypeTable from './category-type-table';
import CategoryModal from './category-modal';
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

  newCategory(event, eventKey) {
    let categoryType = this.props.groupedCategories[Number(eventKey)].categoryType;
    this.setState({ showModal: true, categoryType: categoryType, category: null });
  }

  editCategory(categoryType, category) {
    this.setState({ showModal: true, categoryType: categoryType, category: category});
  }

  handleSave(category) {
    if (category.id) {
      categoryActions.updateCategory(category);
    } else {
      categoryActions.createCategory(category);
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
              editCategory={this.editCategory.bind(this)} />
          </div>
        );
      });
    }
  }

  renderMenuItems() {
    if (this.props.loaded) {
      return this.props.groupedCategories.map((group, index) => {
        return (
          <MenuItem key={index} eventKey={index}>{group.categoryType.name} Category</MenuItem>
        );
      });
    }
  }

  renderNewCategoryButtons() {
    return (
      <Dropdown id='new-category' pullRight onSelect={this.newCategory.bind(this)} ref='newCategoryButton'>
        <Dropdown.Toggle>
          <Glyphicon glyph='plus' /> New
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.renderMenuItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <CategoryModal ref='categoryModal' show categoryType={this.state.categoryType} category={this.state.category}
          onSave={this.handleSave.bind(this)} onClose={this.closeModal.bind(this)} />
      )
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
