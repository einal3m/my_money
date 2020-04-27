import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Button from '../common/controls/Button';
import { cancelDeleteBankStatement, deleteBankStatement } from '../../actions/bank-statement-actions';

export default class BankStatementDeleteModal extends React.Component {

  handleDelete = () => {
    deleteBankStatement(this.props.bankStatement);
  };

  handleCancel = () => {
    cancelDeleteBankStatement();
  };

  render() {
    if (!this.props.bankStatement) return <div />;

    return (
      <Modal show size="sm" onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>Delete Import</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This will delete {this.props.bankStatement.transactionCount} transactions.</p>
          <p>Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button type="secondary" onClick={this.handleCancel}>Cancel</Button>
          <Button type="delete" onClick={this.handleDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

BankStatementDeleteModal.propTypes = {
  bankStatement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
  }),
};
