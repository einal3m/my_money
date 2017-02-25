import React from 'react';
import { shallow } from 'enzyme';
import LoanReport from '../loan-report';
import PageHeader from '../../common/page-header';

describe('LoanReport', () => {
  describe('render', () => {
    let report;

    beforeEach(() => {
      report = shallow(
        <LoanReport
          apiStatus={{ status: 'DONE' }}
        />
      );
    });

    it('has a page header', () => {
      const header = report.childAt(0);

      expect(header.type()).toEqual(PageHeader);
      expect(header.prop('title')).toEqual('loan report');
      expect(header.prop('apiStatus')).toEqual({ status: 'DONE' });
    });
  });
});
