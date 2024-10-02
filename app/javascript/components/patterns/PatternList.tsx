import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

import PageHeader from '../common/PageHeader'
import SearchCriteria, {
  ACCOUNT_FILTER,
} from '../common/criteria/SearchCriteria'
import { PatternTable } from './PatternTable'
import PatternModal from './PatternModal'
import { showFormModal } from 'stores/formSlice'
import { useGetPatternsQuery } from 'stores/patternApi'
import { useGroupedCategories } from 'hooks/useGroupedCategories'
import { ModelType } from 'types/models'
import { RootState } from 'stores/store'

import '../../stylesheets/common.scss'
import '../../stylesheets/patterns.scss'

export const PatternList = () => {
  const currentAccount = useSelector(
    (state: RootState) => state.currentStore.currentAccount,
  )
  const { data: patterns, isLoading } = useGetPatternsQuery(
    currentAccount?.id || 0,
    { skip: !currentAccount },
  )
  const { groupedCategories, isSuccess: isSuccessGC } = useGroupedCategories()
  const dispatch = useDispatch()

  const newPattern = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.Pattern,
        model: { accountId: currentAccount?.id },
        allowDelete: false,
      }),
    )
  }

  return (
    <div>
      <PageHeader title="my patterns" isLoading={isLoading}>
        <Button onClick={newPattern}>
          <i className="fas fa-plus" /> New
        </Button>
      </PageHeader>
      <SearchCriteria
        filters={[{ name: ACCOUNT_FILTER, options: { multiple: false } }]}
      />
      <div className="pattern-list">
        {currentAccount && patterns && groupedCategories && isSuccessGC && (
          <PatternTable
            account={currentAccount}
            patterns={patterns}
            groupedCategories={groupedCategories}
          />
        )}
      </div>
      {groupedCategories && isSuccessGC && (
        <PatternModal groupedCategories={groupedCategories} />
      )}
    </div>
  )
}

export default PatternList
