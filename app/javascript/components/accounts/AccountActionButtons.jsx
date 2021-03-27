import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { showFormModal } from '../../actions/form-actions';
import { setCurrentAccount } from '../../actions/account-actions';
import { routeToLoanReport } from '../../actions/routing-actions';

const AccountActionButtons = (props) => {
  const editAccount = () => {
    const accountType = props.account.accountType;
    const modelType = `${accountType[0].toUpperCase()}${accountType.slice(1)} Account`;
    showFormModal(modelType, props.account, { allowDelete: true });
  };

  const viewTransactions = () => {
    setCurrentAccount(props.account.id);
  };

  const viewImportHistory = () => {
    setCurrentAccount(props.account.id);
  };

  const viewLoanReport = () => {
    setCurrentAccount(props.account.id);
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
    if (props.account.accountType === 'loan') 
      return (
        <LinkContainer to="/reports/loanReport">
          <Dropdown.Item eventKey="loan-report">Loan Report</Dropdown.Item>
        </LinkContainer>
      );
    return <div />;
  };

  return (
    <DropdownButton
      title="..."
      alignRight
      id={`action-button-${props.account.id}`}
      onSelect={accountActions}
    >
      <LinkContainer to="/transactions">
        <Dropdown.Item eventKey="transactions">View Transactions</Dropdown.Item>
      </LinkContainer>
      <Dropdown.Item eventKey="edit">Edit Account</Dropdown.Item>
      <LinkContainer to="/importHistory">
        <Dropdown.Item eventKey="import-history">Import History</Dropdown.Item>
      </LinkContainer>
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
