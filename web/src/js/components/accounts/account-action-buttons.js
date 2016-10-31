import React, { PropTypes } from 'react';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import { showFormModal } from '../../actions/form-actions';
import { routeToTransactions } from '../../actions/routing-actions';

const AccountActionButtons = (props) => {
  const editAccount = () => {
    const accountType = props.account.accountType;
    const modelType = `${accountType[0].toUpperCase()}${accountType.slice(1)} Account`;
    showFormModal(modelType, props.account, true);
  };

  const viewTransactions = () => {
    routeToTransactions(props.account.id);
  };

  const accountActions = (eventKey) => {
    switch (eventKey) {
      case 'edit':
        editAccount();
        return;
      case 'transactions':
        viewTransactions();
        return;
      default:
        return;
    }
  };

  return (
    <DropdownButton
      title="..."
      noCaret
      pullRight
      id={`action-button-${props.account.id}`}
      onSelect={accountActions}
    >
      <MenuItem eventKey="transactions">View Transactions</MenuItem>
      <MenuItem eventKey="edit">Edit Account</MenuItem>
    </DropdownButton>
    );
};

AccountActionButtons.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AccountActionButtons;
