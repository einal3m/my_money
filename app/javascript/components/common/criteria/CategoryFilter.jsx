import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentCategory, setCurrentSubcategory } from '../../../actions/category-actions';
import { groupedCategories } from '../../../selectors/category-selector';
import HorizontalFormControl from '../controls/HorizontalFormControl';
import GroupedCategorySelect from '../controls/GroupedCategorySelect';
import SubcategoryPicker from '../controls/SubcategoryPicker';

export class CategoryFilterComponent extends React.Component {

  handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
    this.props.fetch();
  };

  handleSubcategoryChange = (subCategoryId) => {
    setCurrentSubcategory(subCategoryId);
    this.props.fetch();
  };

  renderCategoryPicker() {
    if (this.props.loaded) {
      return (
        <HorizontalFormControl name="currentCategoryId" label="Category" labelCol="4" controlCol="8">
          <GroupedCategorySelect
            name="currentCategoryId"
            allowUnassigned
            value={this.props.currentCategoryId}
            groupedCategories={this.props.groupedCategories}
            onChange={this.handleCategoryChange}
          />
        </HorizontalFormControl>
      );
    }
    return undefined;
  }

  renderSubcategoryPicker() {
    if (this.props.showSubcategories && this.props.loaded && this.props.currentCategoryId) {
      return (
        <HorizontalFormControl name="currentSubcategoryId" label="Subcategory" labelCol="4" controlCol="8">
          <SubcategoryPicker
            name="currentSubcategoryId"
            groupedCategories={this.props.groupedCategories}
            categoryId={this.props.currentCategoryId}
            onChange={this.handleSubcategoryChange}
            value={this.props.currentSubcategoryId}
          />
        </HorizontalFormControl>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-4">
          {this.renderCategoryPicker()}
        </div>
        <div className="col-xs-4">
          {this.renderSubcategoryPicker()}
        </div>
      </div>
    );
  }
}

CategoryFilterComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentCategoryId: PropTypes.number,
  currentSubcategoryId: PropTypes.number,
  showSubcategories: PropTypes.bool,
  fetch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: state.categoryStore.get('categoriesLoaded') &&
      state.categoryStore.get('categoryTypesLoaded') &&
      state.categoryStore.get('subcategoriesLoaded'),
    groupedCategories: groupedCategories(state).toJS(),
    currentCategoryId: state.categoryStore.get('currentCategoryId'),
    currentSubcategoryId: state.categoryStore.get('currentSubcategoryId'),
  };
}

export default connect(mapStateToProps)(CategoryFilterComponent);
