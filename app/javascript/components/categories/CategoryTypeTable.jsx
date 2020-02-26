import React from 'react';
import PropTypes from 'prop-types';
import CategoryRow from './CategoryRow';
import SubcategoryRow from './SubcategoryRow';

export default class CategoryTypeTable extends React.Component {

  renderCategories() {
    if (this.props.categories) {
      return this.props.categories.map(category => (
        <div className="category" key={category.id}>
          <CategoryRow categoryType={this.props.categoryType} category={category} />
          {this.renderSubcategories(category)}
        </div>
      ));
    }
    return undefined;
  }

  renderSubcategories = category => (
    category.subcategories.map(subcategory =>
      <SubcategoryRow key={subcategory.id} category={category} subcategory={subcategory} />
    )
  );

  renderTitle() {
    return <h5 className="text-uppercase">{this.props.categoryType.name}</h5>;
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTitle()}
        {this.renderCategories()}
      </React.Fragment>
    );
  }
}

CategoryTypeTable.propTypes = {
  categoryType: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
