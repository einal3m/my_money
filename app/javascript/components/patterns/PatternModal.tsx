import React from 'react'
import { useSelector } from 'react-redux'

import FormModal from '../common/FormModal'
import PatternForm from './PatternForm'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { Pattern } from 'types/models'
import {
  useUpsertPatternMutation,
  useDeletePatternMutation,
} from 'stores/patternApi'
import { RootState } from 'stores/store'

type PatternModalProps = {
  groupedCategories: GroupedCategories[]
}

const PatternModal = (props: PatternModalProps) => {
  const { show, allowDelete, model, modelType } = useSelector((state: RootState) => state.formStore)
  const [upsertPattern] = useUpsertPatternMutation()
  const [deletePattern] = useDeletePatternMutation()

  const handleSave = (pattern: Pattern) => {
    upsertPattern(pattern)
  }

  const handleDelete = () => {
    deletePattern(model)
  }

  if (show) {
    return (
      <FormModal
        show
        modelName={modelType}
        allowDelete={allowDelete}
        onSave={handleSave}
        onDelete={handleDelete}
      >
        <PatternForm
          pattern={model}
          groupedCategories={props.groupedCategories}
        />
      </FormModal>
    )
  }
  return <div />
}

export default PatternModal
