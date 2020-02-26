import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../common/PageHeader';
import NewModelButtons from '../common/controls/NewModelButtons';
import CategoryTypeTable from './CategoryTypeTable';
import CategoryModal from './CategoryModal';
import { getCategories } from '../../actions/category-actions';
import { editableGroupedCategories } from '../../selectors/category-selector';

import '../../stylesheets/common.scss';
import '../../stylesheets/categories.scss';

export class CategoryListComponent extends React.Component {
  constructor() {
    super();
    getCategories();
  }

  renderCategoryTypes() {
    if (this.props.loaded) {
      return this.props.groupedCategories.map((group) => {
        const categoryTypeCode = group.categoryType.code;
        return (
          <div key={categoryTypeCode} className="category-type">
            <CategoryTypeTable
              categoryType={group.categoryType}
              categories={group.categories}
            />
          </div>
        );
      });
    }
    return undefined;
  }

  render() {
    return (
      <div>
        <PageHeader title="my categories" apiStatus={this.props.apiStatus}>
          <NewModelButtons modelTypes={['Category', 'Subcategory']} />
        </PageHeader>
        <div className="category-list">
          {this.renderCategoryTypes()}
        </div>        
        <CategoryModal groupedCategories={this.props.groupedCategories} />
      </div>
    );
  }
}

CategoryListComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  apiStatus: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    loaded: state.categoryStore.get('categoriesLoaded') &&
            state.categoryStore.get('categoryTypesLoaded') &&
            state.categoryStore.get('subcategoriesLoaded'),
    groupedCategories: editableGroupedCategories(state).toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(CategoryListComponent);
