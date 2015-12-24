import React from 'react';
import { Table } from 'react-bootstrap';
import { toJS } from 'immutable';
import categoryActions from '../../actions/category-actions';

export default class CategoryTypeTable extends React.Component {
  constructor() {
    super();
  }

  renderCategories() {
    return this.props.categories.map(category => {
      return <tr><td>Hello</td></tr>;
    }).toJS();
  }

  renderTitle() {
    return <h3>{this.props.categoryType.get('name')}</h3>;
  }

  renderTable() {
    return (
      <Table hover id='category-table'>
        <tbody>
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
