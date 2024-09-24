import React from 'react'
import { useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import { setCurrentAccount } from 'stores/currentSlice'
import { Account, ModelType } from 'types/models'
import { showFormModal } from 'stores/formSlice'
import { useDeactivateAccountMutation } from 'stores/accountApi'

type AccountActionButtonsProps = {
  account: Account
}

const AccountActionButtons = (props: AccountActionButtonsProps) => {
  const dispatch = useDispatch()
  const [deactivateAccount] = useDeactivateAccountMutation()

  const editAccountHandler = () => {
    const accountType = props.account.accountType
    const modelType = `${accountType[0].toUpperCase()}${accountType.slice(1)} Account`

    dispatch(
      showFormModal({
        modelType: modelType as ModelType,
        model: props.account,
        allowDelete: true,
      }),
    )
  }

  const deactivateAccountHandler = () => {
    deactivateAccount(props.account.id)
  }

  const viewTransactionsHandler = () => {
    dispatch(setCurrentAccount(props.account))
  }

  const viewImportHistoryHandler = () => {
    dispatch(setCurrentAccount(props.account))
  }

  const viewLoanReportHandler = () => {
    dispatch(setCurrentAccount(props.account))
  }

  const accountActions = (eventKey: string | null) => {
    switch (eventKey) {
      case 'edit':
        editAccountHandler()
        return
      case 'deactivate':
        deactivateAccountHandler()
        return
      case 'transactions':
        viewTransactionsHandler()
        return
      case 'import-history':
        viewImportHistoryHandler()
        return
      case 'loan-report':
        viewLoanReportHandler()
        return
      default:
        return
    }
  }

  const renderLoanActions = () => {
    if (props.account.accountType === 'loan')
      return (
        <LinkContainer to="/reports/loanReport">
          <Dropdown.Item eventKey="loan-report">Loan Report</Dropdown.Item>
        </LinkContainer>
      )
    return <div />
  }

  return (
    <DropdownButton
      title="..."
      id={`action-button-${props.account.id}`}
      onSelect={accountActions}
    >
      <LinkContainer to="/transactions">
        <Dropdown.Item eventKey="transactions">View Transactions</Dropdown.Item>
      </LinkContainer>
      <Dropdown.Item eventKey="edit">Edit Account</Dropdown.Item>
      <Dropdown.Item eventKey="deactivate">Deactivate Account</Dropdown.Item>
      <LinkContainer to="/importHistory">
        <Dropdown.Item eventKey="import-history">Import History</Dropdown.Item>
      </LinkContainer>
      {renderLoanActions()}
    </DropdownButton>
  )
}

export default AccountActionButtons
