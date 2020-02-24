import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Button from '../common/controls/Button';
import { hideFormModal } from '../../actions/form-actions';

export default class FormModal extends React.Component {
  constructor() {
    super();
    this.state = { deleteMode: false };
  }

  onSave = () => {
    if (this.form.isValid()) {
      this.props.onSave(this.form.getModel());
      hideFormModal();
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
    hideFormModal();
  };

  renderTitle() {
    return this.props.modelName;
  }

  deleteButton() {
    if (this.props.allowDelete) {
      return (
        <Button key="delete1" pullLeft type="delete" onClick={this.firstDelete}>
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
        <Button key="delete2" type="delete" ref={(b) => { this.deleteButton2 = b; }} onClick={this.secondDelete}>
          Yes, Delete
        </Button>,
      ];
    }

    return [
      this.deleteButton(),
      <Button key="cancel1" ref={(b) => { this.cancelButton = b; }} onClick={hideFormModal}>Cancel</Button>,
      <Button key="save" type="primary" ref={(b) => { this.saveButton = b; }} onClick={this.onSave}>Save</Button>,
    ];
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={hideFormModal} bsSize="small">
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
  children: PropTypes.node.isRequired,
  modelName: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  show: PropTypes.bool.isRequired,
  allowDelete: PropTypes.bool.isRequired,
};
