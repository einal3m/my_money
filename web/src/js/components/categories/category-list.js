'use strict';

import {connect} from 'react-redux';
import React from 'react';
import { toJS } from 'immutable';
import PageHeader from '../common/page-header';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';
import CategoryTypeTable from './category-type-table';
import CategoryModal from './category-modal';
import categoryActions from '../../actions/category-actions';
require("../../../css/common.scss");
require("../../../css/categories.scss");

export class CategoryList extends React.Component {
  constructor() {
    super();
    categoryActions.fetchCategoryTypes();
    this.state = { showModal: false };
  }

  newCategory(event, eventKey) {
    this.setState({ showModal: true, categoryType: Number(eventKey) });
  }

  handleSave(category) {
    categoryActions.createCategory(category);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  renderCategoryTypes() {
    if (this.props.loaded) {
      return this.props.categoryTypes.map(categoryType => {
        let categoryTypeCode = categoryType.get('code');
        return (
          <div key={categoryTypeCode} className='col-sm-6'>
            <CategoryTypeTable categoryType={categoryType} categories={this.props.categoriesByType.get(categoryTypeCode)}/>
          </div>
        );
      }).toJS();
    }
  }

  renderMenuItems() {
    if (this.props.loaded) {
      return this.props.categoryTypes.map((categoryType, index) => {
        return (
          <MenuItem key={index} eventKey={index}>{categoryType.get('name')} Category</MenuItem>
        );
      }).toJS();
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
      let categoryType = this.props.categoryTypes.get(this.state.categoryType);
      return (
        <CategoryModal ref='categoryModal' show categoryType={categoryType}
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
    loaded: state.categoryStore.get('loaded'),
    categoryTypes: state.categoryStore.get('editableCategoryTypes'),
    categoriesByType: state.categoryStore.get('categoriesByType')
  };
}

export default connect(mapStateToProps)(CategoryList);
