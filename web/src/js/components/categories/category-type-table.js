import React from 'react';
import { Table } from 'react-bootstrap';
import CategoryRow from './category-row';
import categoryActions from '../../actions/category-actions';

export default class CategoryTypeTable extends React.Component {
  constructor() {
    super();
  }

  renderCategories() {
    if (this.props.categories) {
      return this.props.categories.map(category => {
        return <CategoryRow key={category.id}  editCategory={this.props.editCategory} 
                  categoryType={this.props.categoryType} category={category} />;
      });
    }
  }

  renderTitle() {
    return <h3>{this.props.categoryType.name}</h3>;
  }

  renderTable() {
    return (
      <Table hover id='category-table'>
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
