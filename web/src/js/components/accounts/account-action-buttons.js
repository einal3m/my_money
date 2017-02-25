import React, { PropTypes } from 'react';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import { showFormModal } from '../../actions/form-actions';
import { routeToTransactions, routeToImportHistory, routeToLoanReport } from '../../actions/routing-actions';

const AccountActionButtons = (props) => {
  const editAccount = () => {
    const accountType = props.account.accountType;
    const modelType = `${accountType[0].toUpperCase()}${accountType.slice(1)} Account`;
    showFormModal(modelType, props.account, { allowDelete: true });
  };

  const viewTransactions = () => {
    routeToTransactions(props.account.id);
  };

  const viewImportHistory = () => {
    routeToImportHistory(props.account.id);
  };

  const viewLoanReport = () => {
    routeToLoanReport(props.account.id);
  };

  const accountActions = (eventKey) => {
    switch (eventKey) {
      case 'edit':
        editAccount();
        return;
      case 'transactions':
        viewTransactions();
        return;
      case 'import-history':
        viewImportHistory();
        return;
      case 'loan-report':
        viewLoanReport();
        return;
      default:
        return;
    }
  };

  const renderLoanActions = () => {
    if (props.account.accountType === 'loan') return <MenuItem eventKey="loan-report">Loan Report</MenuItem>;
    return <div />;
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
      <MenuItem eventKey="import-history">Import History</MenuItem>
      {renderLoanActions()}
    </DropdownButton>
    );
};

AccountActionButtons.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    accountType: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountActionButtons;
