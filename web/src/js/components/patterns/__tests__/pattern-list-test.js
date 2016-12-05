import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { PatternListComponent as PatternList } from '../pattern-list';
import PageHeader from '../../common/page-header';
import SearchCriteria, { ACCOUNT_FILTER } from '../../common/criteria/search-criteria';
import PatternTable from '../pattern-table';
import PatternModal from '../pattern-modal';
import * as patternActions from '../../../actions/pattern-actions';

describe('PatternList', () => {
  let patternList;
  beforeEach(() => {
    spyOn(patternActions, 'getPatterns');
    patternList = shallowRenderer(
      <PatternList loaded />
    );
  });

  describe('render', () => {
    it('has a header with buttons', () => {
      const header = patternList.props.children[0];

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('my patterns');
    });

    it('has search criteria', () => {
      const criteria = patternList.props.children[1];

      expect(criteria.type).toEqual(SearchCriteria);
      expect(criteria.props.filters[0].name).toEqual(ACCOUNT_FILTER);
      expect(criteria.props.filters[0].options.multiple).toEqual(false);
    });

    it('has a table', () => {
      const table = patternList.props.children[2].props.children;

      expect(table.type).toEqual(PatternTable);
    });

    it('has a modal', () => {
      const modal = patternList.props.children[3];

      expect(modal.type).toEqual(PatternModal);
    });
  });

  describe('initialise', () => {
    it('calls get patterns', () => {
      expect(patternActions.getPatterns).toHaveBeenCalled();
    });
  });
});
