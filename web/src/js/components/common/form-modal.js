import React from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class FormModal extends React.Component {
  constructor() {
    super();
    this.state = {deleteMode: false};
  }

  onSave() {
    var form = this.refs.form;
    if (form.isValid()) {
      this.props.onSave(form.getModel());
      this.props.onClose();
    }
  }

  firstDelete() {
    this.setState({deleteMode: true});
  }

  cancelDelete() {
    this.setState({deleteMode: false});
  }

  secondDelete() {
    this.props.onDelete(this.refs.form.getModel().id);
    this.props.onClose();
  }

  renderTitle() {
    return this.props.modelName;
  }

  deleteButton() {
    if (this.props.allowDelete) {
      return (
        <Button key='delete1' className='pull-left' bsStyle="danger" ref='deleteButton1' onClick={this.firstDelete.bind(this)}>
          Delete
        </Button>
      );
    }
  }

  renderButtons() {
    if (this.state.deleteMode) {
      return [
        <span key='check' className='pull-left'>Are you sure?</span>,
        <Button key='cancel2' ref='cancelDeleteButton' onClick={this.cancelDelete.bind(this)}>Cancel</Button>,
        <Button key='delete2' bsStyle="danger" ref='deleteButton2' onClick={this.secondDelete.bind(this)}>Yes, Delete</Button>
      ]
    } else {
      return [
        this.deleteButton(),
        <Button key='cancel1' ref='cancelButton' onClick={this.props.onClose}>Cancel</Button>,
        <Button key='save' bsStyle="success" ref='saveButton' onClick={this.onSave.bind(this)}>Save</Button>
      ]
    }
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
  onDelete: React.PropTypes.func,
  onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired,
  allowDelete: React.PropTypes.bool.isRequired
};
