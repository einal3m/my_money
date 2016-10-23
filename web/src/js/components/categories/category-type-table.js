import React from 'react';
import { Table } from 'react-bootstrap';
import CategoryRow from './category-row';
import SubcategoryRow from './subcategory-row';
import categoryActions from '../../actions/category-actions';

export default class CategoryTypeTable extends React.Component {
  constructor() {
    super();
  }

  renderCategories() {
    if (this.props.categories) {
      return this.props.categories.map((category) => {
        return [
          <CategoryRow key={category.id} onClickHandler={this.props.editCategory}
            categoryType={this.props.categoryType} category={category}
          />,
          this.renderSubcategories(category),
        ];
      });
    }
  }

  renderSubcategories(category) {
    return category.subcategories.map(subcategory =>
      <SubcategoryRow key={subcategory.id} category={category}
        subcategory={subcategory} onClickHandler={this.props.editSubcategory}
      />
    );
  }


  renderTitle() {
    return <h3>{this.props.categoryType.name}</h3>;
  }

  renderTable() {
    return (
      <Table hover id="category-table">
        <tbody>
          {this.renderCategories()}
        </tbody>
      </Table>
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
  editCategory: React.PropTypes.func.isRequired,
  editSubcategory: React.PropTypes.func.isRequired,
};
