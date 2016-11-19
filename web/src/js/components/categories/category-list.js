import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import NewModelButtons from '../common/controls/new-model-buttons';
import CategoryTypeTable from './category-type-table';
import CategoryModal from './category-modal';
import categoryActions from '../../actions/category-actions';
import { editableGroupedCategories } from '../../selectors/category-selector';

require('../../../css/common.scss');
require('../../../css/categories.scss');

export class CategoryListComponent extends React.Component {
  constructor() {
    super();
    categoryActions.getCategories();
  }

  renderCategoryTypes() {
    if (this.props.loaded) {
      return this.props.groupedCategories.map((group) => {
        const categoryTypeCode = group.categoryType.code;
        return (
          <div key={categoryTypeCode} className="col-sm-6 category-group">
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

        <div id="category-list" className="container">
          <div className="row">
            {this.renderCategoryTypes()}
          </div>
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
