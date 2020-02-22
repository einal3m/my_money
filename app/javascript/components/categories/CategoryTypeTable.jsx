import React from 'react';
import CategoryRow from './category-row';
import SubcategoryRow from './subcategory-row';

export default class CategoryTypeTable extends React.Component {

  renderCategories() {
    if (this.props.categories) {
      return this.props.categories.map(category => (
        [
          <CategoryRow key={category.id} categoryType={this.props.categoryType} category={category} />,
          this.renderSubcategories(category),
        ]
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
    return <h3>{this.props.categoryType.name}</h3>;
  }

  renderTable() {
    return (
      <table className="table table-hover" id="category-table">
        <tbody>
          {this.renderCategories()}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTable()}
      </div>
    );
  }
}

CategoryTypeTable.propTypes = {
  categoryType: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  categories: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
  })).isRequired,
};
