import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoryForm from './category-form';

export default class CategoryModal extends React.Component {
  onSave() {
    var form = this.refs.categoryForm;
    var isValid = form.isValid();
    if (isValid) {
      this.props.onSave(form.getCategory());
      this.props.onClose();
    }
  }

  renderTitle() {
    return 'New Category';
  }

  render() {
    return (
      <div className='category-modal'>
        <Modal show={this.props.show} onHide={this.props.onClose} bsSize='small'>
          <Modal.Header closeButton>
            <Modal.Title>{this.renderTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CategoryForm ref='categoryForm' categoryType={this.props.categoryType}/>
          </Modal.Body>
          <Modal.Footer>
            <Button ref='cancelButton' onClick={this.props.onClose}>Cancel</Button>
            <Button ref='saveButton' onClick={this.onSave.bind(this)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
