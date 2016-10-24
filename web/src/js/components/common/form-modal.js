import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class FormModal extends React.Component {
  constructor() {
    super();
    this.state = { deleteMode: false };
  }

  onSave = () => {
    if (this.form.isValid()) {
      this.props.onSave(this.form.getModel());
      this.props.onClose();
    }
  };

  firstDelete = () => {
    this.setState({ deleteMode: true });
  };

  cancelDelete = () => {
    this.setState({ deleteMode: false });
  };

  secondDelete = () => {
    this.props.onDelete(this.form.getModel().id);
    this.props.onClose();
  };

  renderTitle() {
    return this.props.modelName;
  }

  deleteButton() {
    if (this.props.allowDelete) {
      return (
        <Button
          key="delete1"
          className="pull-left"
          bsStyle="danger"
          ref={(button) => { this.deleteButton1 = button; }}
          onClick={this.firstDelete}
        >
          Delete
        </Button>
      );
    }
    return undefined;
  }

  renderButtons() {
    if (this.state.deleteMode) {
      return [
        <span key="check" className="pull-left">Are you sure?</span>,
        <Button key="cancel2" ref={(b) => { this.cancelDeleteButton = b; }} onClick={this.cancelDelete}>
          Cancel
        </Button>,
        <Button key="delete2" bsStyle="danger" ref={(b) => { this.deleteButton2 = b; }} onClick={this.secondDelete}>
          Yes, Delete
        </Button>,
      ];
    }

    return [
      this.deleteButton(),
      <Button key="cancel1" ref={(b) => { this.cancelButton = b; }} onClick={this.props.onClose}>Cancel</Button>,
      <Button key="save" bsStyle="success" ref={(b) => { this.saveButton = b; }} onClick={this.onSave}>Save</Button>,
    ];
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose} bsSize="small">
        <Modal.Header>
          <Modal.Title>{this.renderTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {React.cloneElement(this.props.children, { ref: (form) => { this.form = form; } })}
        </Modal.Body>
        <Modal.Footer>
          {this.renderButtons()}
        </Modal.Footer>
      </Modal>
    );
  }
}

FormModal.propTypes = {
  children: React.PropTypes.node.isRequired,
  modelName: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func,
  onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired,
  allowDelete: React.PropTypes.bool.isRequired,
};
