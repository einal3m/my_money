import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { SearchCriteria } from '../search-criteria';
import AccountFilter from '../../common/criteria/account-filter';
import DescriptionFilter from '../../common/description-filter';
import DateRangeFilter from '../../common/criteria/date-range-filter';
import * as transactionActions from '../../../actions/transaction-actions';

describe('SearchCriteria', () => {
  let dateRanges,
    account,
    accountGroups,
    accountTypes;
  beforeEach(() => {
    spyOn(transactionActions, 'getTransactions');

    dateRanges = fromJS([
      { id: 11, name: 'Name1', custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' },
    ]);

    accountTypes = fromJS([
      { id: 1, code: 'savings', name: 'Savings' },
      { id: 3, code: 'other', name: 'Other' },
      { id: 2, code: 'share', name: 'Share' },
    ]);

    account = { id: 1, name: 'Account 1' };
    accountGroups = fromJS({
      savings: [{ id: 2, name: 'Account 2' }],
      share: [account, { id: 3, name: 'Account 3' }],
    });
  });

  describe('render', () => {
    it('does not render filters if data has not loaded', () => {
      const searchCriteria = shallowRenderer(
        <SearchCriteria loaded={false} accountGroups={{}} accountTypes={[]} currentAccount={null} dateRanges={[]} currentDateRange={''} />
      );

      expect(searchCriteria.props.children).toBeUndefined();
    });

    it('does render filters if data has loaded', () => {
      const searchCriteria = shallowRenderer(
        <SearchCriteria loaded accountTypes={accountTypes} accountGroups={accountGroups} currentAccount={fromJS(account)}
          dateRanges={dateRanges} currentDateRange={dateRanges.get(1)} moreOptions={false}
        />
      );
      const [staticFilters, showMore] = searchCriteria.props.children;
      const [accountFilter, dateFilter] = staticFilters;

      expect(accountFilter.type).toEqual(AccountFilter);
      expect(dateFilter.type).toEqual(DateRangeFilter);
      expect(showMore.props.children.props.children.props.children[0]).toEqual('more ');
    });

    it('renders extra filters if more options is true', () => {
      const searchCriteria = shallowRenderer(
        <SearchCriteria loaded accountTypes={accountTypes} accountGroups={accountGroups} currentAccount={fromJS(account)}
          dateRanges={dateRanges} currentDateRange={dateRanges.get(1)} moreOptions searchDescription={'Melanie'}
        />
      );
      const [staticFilters, showLess, searchFilter] = searchCriteria.props.children;

      expect(searchFilter.type).toEqual(DescriptionFilter);
      expect(searchFilter.props.description).toEqual('Melanie');

      expect(showLess.props.children.props.children.props.children[0]).toEqual('less ');
    });
  });

  xdescribe('events', () => {
    let searchCriteria;
    beforeEach(() => {
      searchCriteria = TestUtils.renderIntoDocument(<SearchCriteria loaded accountTypes={accountTypes} accountGroups={accountGroups}
        currentAccount={fromJS(account)} dateRanges={dateRanges} currentDateRange={dateRanges.get(1)}
      />);
    });

    describe('onToggleMoreOrLess', () => {
      it('calls the toggle action and fetches transactions', () => {
        spyOn(transactionActions, 'toggleMoreOrLess');
        TestUtils.Simulate.click(searchCriteria.refs.optionToggle);
        expect(transactionActions.toggleMoreOrLess).toHaveBeenCalled();
        expect(transactionActions.getTransactions).toHaveBeenCalled();
      });
    });

    describe('onDescriptionChange', () => {
      it('calls the description change action and fetches transactions', () => {
        spyOn(transactionActions, 'setSearchDescription');
        searchCriteria.onDescriptionChange('new String');
        expect(transactionActions.setSearchDescription).toHaveBeenCalledWith('new String');
        expect(transactionActions.getTransactions).toHaveBeenCalled();
      });
    });
  });
});
