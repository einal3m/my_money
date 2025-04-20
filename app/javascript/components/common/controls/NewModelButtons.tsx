import React from 'react'

import { Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { showFormModal } from 'stores/formSlice'
import { ModelType } from 'types/models'

type NewModelButtonsProps = {
  modelTypes: ModelType[]
}

export const NewModelButtons = (props: NewModelButtonsProps) => {
  const dispatch = useDispatch()

  const showForm = (modelType: string | null) => {
    dispatch(
      showFormModal({
        modelType: modelType as ModelType,
        model: {},
        allowDelete: false,
      }),
    )
  }

  const renderModelTypes = (modelTypes: string[]) => {
    return modelTypes.map((modelType, i) => (
      <Dropdown.Item
        key={i}
        eventKey={modelType}
      >{`New ${modelType}`}</Dropdown.Item>
    ))
  }

  return (
    <Dropdown id="new-model-dropdown" align="end" onSelect={showForm}>
      <Dropdown.Toggle>
        <i className="fas fa-plus" /> New
      </Dropdown.Toggle>
      <Dropdown.Menu>{renderModelTypes(props.modelTypes)}</Dropdown.Menu>
    </Dropdown>
  )
}

export default NewModelButtons
