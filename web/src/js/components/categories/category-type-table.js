import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import { toJS } from 'immutable';
import CategoryModal from './category-modal';
import categoryActions from '../../actions/category-actions';

export default class CategoryTypeTable extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    }
  }

  newCategory() {
    this.setState({showModal: true});
  }

  handleSave(category) {
    categoryActions.createCategory(category);
  }

  closeModal() {
    this.setState({showModal: false});
  }

  renderCategories() {
    return this.props.categories.map(category => {
      return <tr><td>Hello</td></tr>;
    }).toJS();
  }

  renderTitle() {
    return (
      <h3>
        {this.props.categoryType.get('name')} &nbsp;
        <Button onClick={this.newCategory.bind(this)}><Glyphicon glyph='plus' /> New</Button>
      </h3>
    );
  }

  renderTable() {
    return (
      <Table hover id='category-table'>
        <tbody>
        </tbody>
      </Table>
    );
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <CategoryModal show categoryType={this.props.categoryType}
          onSave={this.handleSave.bind(this)} onClose={this.closeModal.bind(this)} />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTable()}
        {this.renderModal()}
      </div>
    );
  }
}
