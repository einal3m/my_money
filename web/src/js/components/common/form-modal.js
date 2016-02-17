import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class FormModal extends React.Component {
  onSave() {
    var form = this.refs.form;
    if (form.isValid()) {
      this.props.onSave(form.getModel());
      this.props.onClose();
    }
  }

  renderTitle() {
    return this.props.modelName;
  }

  renderButtons() {
    return [
      <Button key='cancel' ref='cancelButton' onClick={this.props.onClose}>Cancel</Button>,
      <Button key='save' ref='saveButton' onClick={this.onSave.bind(this)}>Save</Button>
    ]
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose} bsSize='small'>
        <Modal.Header>
          <Modal.Title>{this.renderTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {React.cloneElement(this.props.children, {ref: 'form'})}
        </Modal.Body>
        <Modal.Footer>
          {this.renderButtons()}
        </Modal.Footer>
      </Modal>
    );
  }
}

FormModal.propTypes = {
  modelName: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired
};
