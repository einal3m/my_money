import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import * as dateRangeActions from '../../../../actions/date-range-actions';
import { DateRangeFilterComponent as DateRangeFilter } from '../date-range-filter';
import DatePicker from '../../date-picker/date-picker';
import DropDown from '../../controls/drop-down';

describe('DateRangeFilter', () => {
  let dateRanges;
  let fetchSpy;
  beforeEach(() => {
    dateRanges = [
      { id: 11, name: 'Name1', custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' },
    ];

    fetchSpy = jasmine.createSpy('fetchSpy');
  });

  describe('render', () => {
    it('renders empty div when date ranges not loaded', () => {
      const dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded={false} dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );

      expect(dateRangeFilter.props.children).toEqual(<div />);
    });

    it('has a select with date range options', () => {
      const dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );

      const dateRange = dateRangeFilter.props.children[0];

      const selectGroup = dateRange.props.children.props.children;
      const label = selectGroup.props.children[0];
      const select = selectGroup.props.children[1].props.children;
      expect(label.props.children).toEqual('Date Range');
      expect(select.type).toEqual(DropDown);
      expect(select.props.value).toEqual(22);
      expect(select.props.options).toEqual(dateRanges);
    });

    it('disables the from and to date if date range is not custom', () => {
      const dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );
      const fromDate = dateRangeFilter.props.children[1];
      const toDate = dateRangeFilter.props.children[2];

      const fromDateInput = fromDate.props.children.props.children.props.children[1].props.children[0];
      expect(fromDateInput.type).toEqual(DatePicker);
      expect(fromDateInput.props.value).toEqual('2014-06-23');
      expect(fromDateInput.props.disabled).toEqual(true);

      const toDateInput = toDate.props.children.props.children.props.children[1].props.children[0];
      expect(toDateInput.type).toEqual(DatePicker);
      expect(toDateInput.props.value).toEqual('2014-09-03');
      expect(fromDateInput.props.disabled).toEqual(true);
    });

    it('enables the from and to date if date range is custom', () => {
      const dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[0]} fetch={fetchSpy} />
      );
      const fromDate = dateRangeFilter.props.children[1];
      const toDate = dateRangeFilter.props.children[2];

      const fromDateInput = fromDate.props.children.props.children.props.children[1].props.children[0];
      expect(fromDateInput.type).toEqual(DatePicker);
      expect(fromDateInput.props.value).toEqual('2015-07-01');
      expect(fromDateInput.props.disabled).toEqual(false);

      const toDateInput = toDate.props.children.props.children.props.children[1].props.children[0];
      expect(toDateInput.type).toEqual(DatePicker);
      expect(toDateInput.props.value).toEqual('2015-08-03');
      expect(fromDateInput.props.disabled).toEqual(false);
    });
  });

  describe('select date range', () => {
    it('calls an action', () => {
      spyOn(dateRangeActions, 'setCurrentDateRange');
      const dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );
      const dateRangeDropDown = TestUtils.findRenderedComponentWithType(dateRangeFilter, DropDown);

      dateRangeDropDown.props.onChange(11);

      expect(dateRangeActions.setCurrentDateRange).toHaveBeenCalledWith(11);
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  describe('change from date', () => {
    it('updates store date ranges', () => {
      spyOn(dateRangeActions, 'updateCurrentDateRange');

      const dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[0]} fetch={fetchSpy} />
      );
      const fromDatePicker = TestUtils.scryRenderedComponentsWithType(dateRangeFilter, DatePicker)[0];

      fromDatePicker.props.onChange('2000-07-14');

      expect(dateRangeActions.updateCurrentDateRange).toHaveBeenCalledWith({ fromDate: '2000-07-14' });
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  describe('change to date', () => {
    it('updates store date ranges', () => {
      spyOn(dateRangeActions, 'updateCurrentDateRange');

      const dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[0]} fetch={fetchSpy} />
      );
      const toDatePicker = TestUtils.scryRenderedComponentsWithType(dateRangeFilter, DatePicker)[1];

      toDatePicker.props.onChange('2000-07-15');

      expect(dateRangeActions.updateCurrentDateRange).toHaveBeenCalledWith({ toDate: '2000-07-15' });
      expect(fetchSpy).toHaveBeenCalledWith();
    });
  });
});
