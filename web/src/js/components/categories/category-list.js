'use strict';

import {connect} from 'react-redux';
import React from 'react';
import { toJS } from 'immutable';
import PageHeader from '../common/page-header';
import CategoryTypeTable from './category-type-table';
import categoryActions from '../../actions/category-actions';
require("../../../css/common.scss");

export class CategoryList extends React.Component {
  constructor() {
    super();
    categoryActions.fetchCategoryTypes();
  }

  renderCategoryTypes() {
    if (this.props.loaded) {
      return this.props.categoryTypes.map(categoryType => {
        return (
          <div key={categoryType.get('code')} className='col-sm-6'>
            <CategoryTypeTable categoryType={categoryType} />
          </div>
        );
      }).toJS();
    }
  }

  render() {
    return (
      <div>
        <PageHeader title="my categories" />

        <div className="container">
          <div className='row'>
            {this.renderCategoryTypes()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.categoryStore.get('loaded'),
    categoryTypes: state.categoryStore.get('editableCategoryTypes')
  };
}

export default connect(mapStateToProps)(CategoryList);
