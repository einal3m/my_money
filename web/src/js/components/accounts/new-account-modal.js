import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SavingsAccountForm from './savings-account-form';
import ShareAccountForm from './share-account-form';

export default class NewAccountModal extends React.Component {
  onSave() {
    var newAccountForm = this.refs.newAccountForm;
    var isValid = newAccountForm.isValid();
    if (isValid) {
      this.props.onSave(newAccountForm.getAccount());
      this.props.onClose();
    }
  }

  capitalizeFirstLetter(string) {
      return string[0].toUpperCase() + string.slice(1);
  }

  renderTitle() {
    return 'New ' + this.capitalizeFirstLetter(this.props.accountType) + ' Account';
  }

  renderForm() {
    if (this.props.accountType === 'share') {
      return <ShareAccountForm ref='newAccountForm' />
    }
    return <SavingsAccountForm ref='newAccountForm' />;
  }

  render() {
    return (
      <div className='new-account-modal'>
        <Modal show={this.props.show} onHide={this.props.onClose} bsSize='small'>
          <Modal.Header>
            <Modal.Title>{this.renderTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderForm()}
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

NewAccountModal.propTypes = {
  accountType: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
};
