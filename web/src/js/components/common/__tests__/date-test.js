import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import Date from '../date';

describe('Date', () => {
  describe('render', () => {
    it('formats the date', () => {
      const date = shallowRenderer(<Date date={'2015-07-03'} />);

      expect(date.props.children).toEqual('03-Jul-2015');
    });
  });
});
