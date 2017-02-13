import React from 'react';
import { shallow } from 'enzyme';
import { ImportHistoryPageComponent as ImportHistoryPage } from '../import-history-page';
import PageHeader from '../../common/page-header';
import SearchCriteria, { ACCOUNT_FILTER } from '../../common/criteria/search-criteria';
import BankStatementTable from '../bank-statement-table';
import * as BankStatementActions from '../../../actions/bank-statement-actions';

describe('ImportHistoryPage', () => {
  let importHistoryPage;
  const bankStatements = [
    { id: 123, accountId: 2, date: '2001-10-19', fileName: 'one.ofx', transactionCount: 6 },
    { id: 456, accountId: 2, date: '2001-10-20', fileName: 'two.ofx', transactionCount: 8 },
  ];

  beforeEach(() => {
    spyOn(BankStatementActions, 'getBankStatements');
  });

  describe('render', () => {
    it('has a header, filter', () => {
      importHistoryPage = shallow(
        <ImportHistoryPage loaded={false} apiStatus={{ status: 'DONE' }} bankStatements={[]} />
      );

      const [header, filter, table] = importHistoryPage.children();

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('import history');
      expect(header.props.apiStatus).toEqual({ status: 'DONE' });

      expect(filter.type).toEqual(SearchCriteria);
      expect(filter.props.filters).toEqual([{ name: ACCOUNT_FILTER }]);

      expect(table).toEqual(<div />);
    });

    it('has a table if bank statements are loaded', () => {
      importHistoryPage = shallow(
        <ImportHistoryPage loaded apiStatus={{ status: 'DONE' }} bankStatements={bankStatements} />
      );

      const table = importHistoryPage.find(BankStatementTable);
      expect(table.prop('bankStatements')).toEqual(bankStatements);
    });
  });
});
