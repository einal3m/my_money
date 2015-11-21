import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class NewAccountModal extends React.Component {
  onSave() {
    
    this.props.onClose();
  }

  render() {
    return (
      <div className='new-account-modal'>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Some text here
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
