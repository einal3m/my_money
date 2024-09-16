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
import { selectCurrentState } from 'selectors/currentSelectors'
import { useGetPatternsQuery } from 'stores/patternApi'
import { useGroupedCategories } from 'hooks/useGroupedCategories'
import { ModelType } from 'types/models'

import '../../stylesheets/common.scss'
import '../../stylesheets/patterns.scss'

export const PatternList = () => {
  const { currentAccount } = useSelector(selectCurrentState)
  const {
    data: patterns,
    isLoading,
    isSuccess,
  } = useGetPatternsQuery(currentAccount.id, { skip: !currentAccount })
  const { groupedCategories, isSuccess: isSuccessGC } = useGroupedCategories()
  const dispatch = useDispatch();
  
  const newPattern = () => {
    dispatch(showFormModal({
      modelType: ModelType.Pattern,
      model: { accountId: currentAccount.id },
      allowDelete: false
    }))
  }

  return (
    <div>
      <PageHeader title="my patterns" apiStatus={isLoading ? 'loading' : ''}>
        <Button onClick={newPattern}>
          <i className="fas fa-plus" /> New
        </Button>
      </PageHeader>
      <SearchCriteria
        filters={[{ name: ACCOUNT_FILTER, options: { multiple: false } }]}
      />
      <div className="pattern-list">
        {isSuccess && isSuccessGC && (
          <PatternTable
            account={currentAccount}
            patterns={patterns}
            groupedCategories={groupedCategories}
          />
        )}
      </div>
      <PatternModal groupedCategories={groupedCategories} />
    </div>
  )
}

export default PatternList
