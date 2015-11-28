import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { SearchCriteria } from '../search-criteria';
import AccountFilter from '../../common/account-filter';
import DateRangeFilter from '../../common/date-range-filter';

describe('SearchCriteria', () => {
  let dateRanges;
  beforeEach(() => {
    dateRanges = [
      { id: 11, name: 'Name1', custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];
  });

  describe('render', () => {
    it('does not render filters if data has not loaded', () => {
      let searchCriteria = shallowRenderer(
        <SearchCriteria loaded={false} accountGroups={[]} dateRanges={[]} currentDateRange={''}/>
      );

      expect(searchCriteria.props.children).toBeUndefined();
    });

    it('does renders filters if data has loaded', () => {
      let searchCriteria = shallowRenderer(
        <SearchCriteria loaded={true} accountGroups={[]}
        dateRanges={dateRanges} currentDateRange={dateRanges[1]} />
      );
      let [accountFilter, dateFilter] = searchCriteria.props.children;

      expect(accountFilter.type).toEqual(AccountFilter);
      expect(accountFilter.props.accountGroups).toEqual([]);

      expect(dateFilter.type).toEqual(DateRangeFilter);
      expect(dateFilter.props.dateRanges).toEqual(dateRanges);
      expect(dateFilter.props.currentDateRange).toEqual(dateRanges[1]);
    });
  });
});
