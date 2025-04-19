import React, { PropsWithChildren, useState } from 'react'

import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Button from './controls/Button'
import { hideFormModal } from 'stores/formSlice'
import { ModelType } from 'types/models'

import '../../stylesheets/modal.scss'

type FormModalProps = PropsWithChildren & {
  modelId?: number
  modelName: ModelType
  show: boolean
  allowDelete: boolean
  onDelete: (id: number) => void
}
export const FormModal = (props: FormModalProps) => {
  const [deleteMode, setDeleteMode] = useState(false)
  const dispatch = useDispatch()

  const hideForm = () => {
    dispatch(hideFormModal())
  }

  const firstDelete = () => {
    setDeleteMode(true)
  }
  const cancelDelete = () => {
    setDeleteMode(false)
  }

  const secondDelete = () => {
    if (props.modelId) {
      props.onDelete(props.modelId)
      hideForm()
    }
  }

  const renderDeleteButton = () => {
    if (props.allowDelete) {
      return (
        <Button key="delete1" pullLeft type="delete" onClick={firstDelete}>
          Delete
        </Button>
      )
    }
    return undefined
  }

  const renderButtons = () => {
    if (deleteMode) {
      return [
        <span key="check" className="pull-left">
          Are you sure?
        </span>,
        <Button key="cancel2" onClick={cancelDelete}>
          Cancel
        </Button>,
        <Button key="delete2" type="delete" onClick={secondDelete}>
          Yes, Delete
        </Button>,
      ]
    }

    return [
      renderDeleteButton(),
      <Button key="cancel1" onClick={hideForm}>
        Cancel
      </Button>,
      <Button key="save" type="submit">
        Save
      </Button>,
    ]
  }

  return (
    <Modal show={props.show} onHide={hideForm} size="sm">
      <Modal.Header>
        <Modal.Title>{props.modelName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>{renderButtons()}</Modal.Footer>
    </Modal>
  )
}
