import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { PatternListComponent as PatternList } from '../pattern-list';
import PageHeader from '../../common/page-header';
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
      const [header, _body, modal] = patternList.props.children;

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('my patterns');

      expect(modal.type).toEqual(PatternModal);
    });
  });

  describe('initialise', () => {
    it('calls get patterns', () => {
      expect(patternActions.getPatterns).toHaveBeenCalled();
    });
  });
});
