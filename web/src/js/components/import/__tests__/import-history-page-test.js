import React from 'react';
import { shallow } from 'enzyme';
import { ImportHistoryPageComponent as ImportHistoryPage } from '../import-history-page';
import PageHeader from '../../common/page-header';
import SearchCriteria, { ACCOUNT_FILTER } from '../../common/criteria/search-criteria';
import * as AccountActions from '../../../actions/account-actions';

describe('ImportHistoryPage', () => {
  let importHistoryPage;

  beforeEach(() => {
    spyOn(AccountActions, 'getAccounts');
    importHistoryPage = shallow(
      <ImportHistoryPage />
    );
  });

  describe('render', () => {
    it('has a header, title, filter and a table', () => {
      const [header, filter] = importHistoryPage.children();

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('import history');

      expect(filter.type).toEqual(SearchCriteria);
      expect(filter.props.filters).toEqual([{ name: ACCOUNT_FILTER }]);
    });
  });
});
