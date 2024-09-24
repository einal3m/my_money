import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'stores/store'
import Button from 'components/common/controls/Button'
import { hideFormModal } from 'stores/formSlice'
import { useDeleteBankStatementMutation } from 'stores/importApi'

const BankStatementDeleteModal = () => {
  const { show, model } = useSelector((state: RootState) => state.formStore)
  const dispatch = useDispatch()
  const [deleteBankStatement] = useDeleteBankStatementMutation()

  const handleDelete = () => {
    deleteBankStatement(model)
  }

  const handleCancel = () => {
    dispatch(hideFormModal())
  }

  if (!model) return <div />

  return (
    <Modal show={show} size="sm" onHide={handleCancel}>
      <Modal.Header>
        <Modal.Title>Delete Import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This will delete {model.transactionCount} transactions.</p>
        <p>Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="delete" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BankStatementDeleteModal
