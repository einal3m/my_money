import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { SearchCriteriaComponent as SearchCriteria } from '../search-criteria';
import AccountFilter from '../../common/criteria/account-filter';
import DescriptionFilter from '../../common/description-filter';
import DateRangeFilter from '../../common/criteria/date-range-filter';
import * as transactionActions from '../../../actions/transaction-actions';

describe('TransactionSearchCriteria', () => {
  beforeEach(() => {
    spyOn(transactionActions, 'getTransactions');
  });

  describe('render', () => {
    it('does not render filters if data has not loaded', () => {
      const searchCriteria = shallowRenderer(
        <SearchCriteria
          loaded={false}
        />
      );

      expect(searchCriteria.props.children).toBeUndefined();
    });

    it('does render filters if data has loaded', () => {
      const searchCriteria = shallowRenderer(
        <SearchCriteria
          loaded
          moreOptions={false}
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
        <SearchCriteria
          loaded
          moreOptions
          searchDescription={'Melanie'}
        />
      );
      const [_staticFilters, showLess, searchFilter] = searchCriteria.props.children;

      expect(searchFilter.type).toEqual(DescriptionFilter);
      expect(searchFilter.props.description).toEqual('Melanie');

      expect(showLess.props.children.props.children.props.children[0]).toEqual('less ');
    });
  });

  describe('events', () => {
    describe('onToggleMoreOrLess', () => {
      it('calls the toggle action and fetches transactions', () => {
        const searchCriteria = shallowRenderer(<SearchCriteria loaded />);
        const showMore = searchCriteria.props.children[1].props.children;
        spyOn(transactionActions, 'toggleMoreOrLess');

        showMore.props.onClick();

        expect(transactionActions.toggleMoreOrLess).toHaveBeenCalled();
        expect(transactionActions.getTransactions).toHaveBeenCalled();
      });
    });

    describe('onDescriptionChange', () => {
      it('calls the description change action and fetches transactions', () => {
        const searchCriteria = shallowRenderer(<SearchCriteria loaded moreOptions searchDescription={'Melanie'} />);
        const descriptionFilter = searchCriteria.props.children[2];
        spyOn(transactionActions, 'setSearchDescription');

        descriptionFilter.props.onChange('new String');

        expect(transactionActions.setSearchDescription).toHaveBeenCalledWith('new String');
        expect(transactionActions.getTransactions).toHaveBeenCalled();
      });
    });
  });
});
