import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { fromJS, toJS } from 'immutable';
import { SearchCriteria } from '../search-criteria';
import AccountFilter from '../../common/account-filter';
import DateRangeFilter from '../../common/date-range-filter';
import accountActions from '../../../actions/account-actions';
import transactionActions from '../../../actions/transaction-actions';
import staticDataActions from '../../../actions/date-range-actions';

describe('SearchCriteria', () => {
  let dateRanges, account, accountGroups, accountTypes;
  beforeEach(() => {
    spyOn(transactionActions, 'fetchTransactions');      

    dateRanges = fromJS([
      { id: 11, name: 'Name1', custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ]);

    accountTypes = fromJS([
      { id: 1, code: 'savings', name: 'Savings' },
      { id: 3, code: 'other', name: 'Other' },
      { id: 2, code: 'share', name: 'Share' }
    ]);

    account = { id: 1, name: 'Account 1' };
    accountGroups = fromJS({
      'savings': [ { id: 2, name: 'Account 2' } ],
      'share': [ account, { id: 3, name: 'Account 3' } ]
    });
  });

  describe('render', () => {
    it('does not render filters if data has not loaded', () => {
      let searchCriteria = shallowRenderer(
        <SearchCriteria loaded={false} accountGroups={{}} accountTypes={[]} currentAccount={null} dateRanges={[]} currentDateRange={''}/>
      );

      expect(searchCriteria.props.children).toBeUndefined();
    });

    it('does render filters if data has loaded', () => {
      let searchCriteria = shallowRenderer(
        <SearchCriteria loaded={true} accountTypes={accountTypes} accountGroups={accountGroups} currentAccount={fromJS(account)}
          dateRanges={dateRanges} currentDateRange={dateRanges.get(1)} />
      );
      let [accountFilter, dateFilter] = searchCriteria.props.children;

      expect(accountFilter.type).toEqual(AccountFilter);
      expect(accountFilter.props.accountGroups).toEqual(accountGroups);
      expect(accountFilter.props.accountTypes).toEqual(accountTypes);
      expect(accountFilter.props.currentAccount.toJS()).toEqual(account);

      expect(dateFilter.type).toEqual(DateRangeFilter);
      expect(dateFilter.props.dateRanges).toEqual(dateRanges);
      expect(dateFilter.props.currentDateRange).toEqual(dateRanges.get(1));
    });
  });

  describe('events', () => {
    let searchCriteria;
    beforeEach(() => {
      searchCriteria = TestUtils.renderIntoDocument(<SearchCriteria loaded={true} accountTypes={accountTypes} accountGroups={accountGroups} 
        currentAccount={fromJS(account)} dateRanges={dateRanges} currentDateRange={dateRanges.get(1)} />);
    });

    it('onAccountChange change updates current account and fetches transactions', () => {
      spyOn(accountActions, 'setCurrentAccount')
      searchCriteria.onAccountChange(3);
      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(3);
      expect(transactionActions.fetchTransactions).toHaveBeenCalled();
    });

    describe('onDateRangeChange', () => {
      it('id change sets current date range and fetches transactions', () => {
        spyOn(staticDataActions, 'setCurrentDateRange')
        searchCriteria.onDateRangeChange({id: 11});
        expect(staticDataActions.setCurrentDateRange).toHaveBeenCalledWith(11);
        expect(transactionActions.fetchTransactions).toHaveBeenCalled();
      });

      it('from date change updates current date range and fetches transactions', () => {
        spyOn(staticDataActions, 'updateCurrentDateRange')
        searchCriteria.onDateRangeChange({fromDate: '2001-09-08'});
        expect(staticDataActions.updateCurrentDateRange).toHaveBeenCalledWith({fromDate: '2001-09-08'});
        expect(transactionActions.fetchTransactions).toHaveBeenCalled();
      });

      it('to date change updates current date range and fetches transactions', () => {
        spyOn(staticDataActions, 'updateCurrentDateRange')
        searchCriteria.onDateRangeChange({toDate: '2001-09-24'});
        expect(staticDataActions.updateCurrentDateRange).toHaveBeenCalledWith({toDate: '2001-09-24'});
        expect(transactionActions.fetchTransactions).toHaveBeenCalled();
      });
    });
  });
});
