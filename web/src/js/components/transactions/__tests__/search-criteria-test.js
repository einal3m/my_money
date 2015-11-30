import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { SearchCriteria } from '../search-criteria';
import AccountFilter from '../../common/account-filter';
import DateRangeFilter from '../../common/date-range-filter';
import accountActions from '../../../actions/account-actions';
import transactionActions from '../../../actions/transaction-actions';
import staticDataActions from '../../../actions/static-data-actions';

describe('SearchCriteria', () => {
  let dateRanges, account, accountGroups;
  beforeEach(() => {
    dateRanges = [
      { id: 11, name: 'Name1', custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];
    account = { id: 1, name: 'Account 1' };
    accountGroups = [
      { code: 'savings', name: 'Savings', accounts: [{ id: 2, name: 'Account 2' }] },
      { code: 'other', name: 'Other', accounts: [] },
      { code: 'share', name: 'Share', accounts: [ account, { id: 3, name: 'Account 3' } ] }
    ];
  });

  describe('render', () => {
    it('does not render filters if data has not loaded', () => {
      let searchCriteria = shallowRenderer(
        <SearchCriteria loaded={false} accountGroups={[]} currentAccount={null} dateRanges={[]} currentDateRange={''}/>
      );

      expect(searchCriteria.props.children).toBeUndefined();
    });

    it('does renders filters if data has loaded', () => {
      let searchCriteria = shallowRenderer(
        <SearchCriteria loaded={true} accountGroups={accountGroups} currentAccount={account}
        dateRanges={dateRanges} currentDateRange={dateRanges[1]} />
      );
      let [accountFilter, dateFilter] = searchCriteria.props.children;

      expect(accountFilter.type).toEqual(AccountFilter);
      expect(accountFilter.props.accountGroups).toEqual(accountGroups);

      expect(dateFilter.type).toEqual(DateRangeFilter);
      expect(dateFilter.props.dateRanges).toEqual(dateRanges);
      expect(dateFilter.props.currentDateRange).toEqual(dateRanges[1]);
    });
  });

  describe('events', () => {
    let searchCriteria;
    beforeEach(() => {
      searchCriteria = TestUtils.renderIntoDocument(<SearchCriteria loaded={true} accountGroups={accountGroups} 
        currentAccount={account} dateRanges={dateRanges} currentDateRange={dateRanges[1]} />);
    });

    it('onAccountChange change updates current account and fetches transactions', () => {
      spyOn(accountActions, 'setCurrentAccount')
      spyOn(transactionActions, 'fetchTransactions');
      searchCriteria.onAccountChange(3);
      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(3);
      expect(transactionActions.fetchTransactions).toHaveBeenCalledWith(3, dateRanges[1].fromDate, dateRanges[1].toDate);
    });

    describe('onDateRangeChange', () => {
      it('id change sets current date range and fetches transactions', () => {
        spyOn(staticDataActions, 'setCurrentDateRange')
        spyOn(transactionActions, 'fetchTransactions');
        searchCriteria.onDateRangeChange({id: 11});
        expect(staticDataActions.setCurrentDateRange).toHaveBeenCalledWith(11);
        expect(transactionActions.fetchTransactions).toHaveBeenCalledWith(1, dateRanges[0].fromDate, dateRanges[0].toDate);
      });

      it('from date change updates current date range and fetches transactions', () => {
        spyOn(staticDataActions, 'updateCurrentDateRange')
        spyOn(transactionActions, 'fetchTransactions');
        searchCriteria.onDateRangeChange({fromDate: '2001-09-08'});
        expect(staticDataActions.updateCurrentDateRange).toHaveBeenCalledWith({fromDate: '2001-09-08'});
        expect(transactionActions.fetchTransactions).toHaveBeenCalledWith(1, '2001-09-08', dateRanges[1].toDate);
      });

      it('to date change updates current date range and fetches transactions', () => {
        spyOn(staticDataActions, 'updateCurrentDateRange')
        spyOn(transactionActions, 'fetchTransactions');
        searchCriteria.onDateRangeChange({toDate: '2001-09-24'});
        expect(staticDataActions.updateCurrentDateRange).toHaveBeenCalledWith({toDate: '2001-09-24'});
        expect(transactionActions.fetchTransactions).toHaveBeenCalledWith(1, dateRanges[1].fromDate, '2001-09-24');
      });
    });
  });
});
