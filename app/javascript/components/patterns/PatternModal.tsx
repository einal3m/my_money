import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FormModal } from 'components/common/NewFormModal'
import { PatternForm } from './PatternForm'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { ModelType, Pattern } from 'types/models'
import {
  useUpsertPatternMutation,
  useDeletePatternMutation,
} from 'stores/patternApi'
import { RootState } from 'stores/store'
import { hideFormModal } from 'stores/formSlice'

type PatternModalProps = {
  groupedCategories: GroupedCategories[]
}

export const PatternModal = (props: PatternModalProps) => {
  const { show, allowDelete, model } = useSelector(
    (state: RootState) => state.formStore,
  )
  const [upsertPattern] = useUpsertPatternMutation()
  const [deletePattern] = useDeletePatternMutation()

  const dispatch = useDispatch()

  const handleSave = (pattern: Pattern) => {
    upsertPattern(pattern)
    dispatch(hideFormModal())
  }

  const handleDelete = () => {
    deletePattern(model)
  }

  if (show) {
    return (
      <FormModal
        show
        modelId={model.id}
        modelName={ModelType.Pattern}
        allowDelete={allowDelete}
        onDelete={handleDelete}
      >
        <PatternForm
          pattern={model}
          groupedCategories={props.groupedCategories}
          onSubmit={handleSave}
        />
      </FormModal>
    )
  }
  return <div />
}
