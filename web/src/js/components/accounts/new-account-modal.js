import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SavingsAccountForm from './savings-account-form';

export default class NewAccountModal extends React.Component {
  onSave() {
    var newAccountForm = this.refs.newAccountForm;
    var isValid = newAccountForm.validateAll();
    if (isValid) {
      this.props.onSave(newAccountForm.getAccount());
      this.props.onClose();
    }
  }

  render() {
    return (
      <div className='new-account-modal'>
        <Modal show={this.props.show} onHide={this.props.onClose} bsSize='small'>
          <Modal.Header closeButton>
            <Modal.Title>New Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SavingsAccountForm ref='newAccountForm' />
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
