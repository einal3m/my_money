import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import DateRangeFilter from '../date-range-filter';
import { Input, Button } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-datetimepicker';

describe('DateRangeFilter', () => {
  let dateRanges, onChangeSpy;
  beforeEach(() => {
    dateRanges = [
      { id: 11, name: 'Name1', custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];

    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('has a select with date range options', () => {
      let dateRangeFilter = shallowRenderer(
        <DateRangeFilter dateRanges={dateRanges} currentDateRange={dateRanges[1]} onChange={onChangeSpy} />
      );

      let [dateRange, fromDate, toDate] = dateRangeFilter.props.children;

      let select = dateRange.props.children.props.children;
      expect(select.type).toEqual(Input);
      expect(select.props.defaultValue).toEqual(22);
      expect(select.props.children[0].type).toEqual('option');
      expect(select.props.children[0].props.children).toEqual('Name1');
      expect(select.props.children[1].type).toEqual('option');
      expect(select.props.children[1].props.children).toEqual('Name2');
    });

    it('disables the from and to date if date range is not custom', () => {
      let dateRangeFilter = shallowRenderer(
        <DateRangeFilter dateRanges={dateRanges} currentDateRange={dateRanges[1]} onChange={onChangeSpy} />
      );
      let [dateRange, fromDate, toDate] = dateRangeFilter.props.children;

      let fromDateInput = fromDate.props.children[1].props.children[0];
      expect(fromDateInput.type).toEqual(DatePicker);
      expect(fromDateInput.props.dateTime).toEqual('2014-06-23');
      expect(fromDateInput.props.disabled).toEqual(true);

      let toDateInput = toDate.props.children[1].props.children[0];
      expect(toDateInput.type).toEqual(DatePicker);
      expect(toDateInput.props.dateTime).toEqual('2014-09-03');
      expect(fromDateInput.props.disabled).toEqual(true);
    });

    it('enables the from and to date if date range is custom', () => {
      let dateRangeFilter = shallowRenderer(
        <DateRangeFilter dateRanges={dateRanges} currentDateRange={dateRanges[0]} onChange={onChangeSpy} />
      );
      let [dateRange, fromDate, toDate] = dateRangeFilter.props.children;

      let fromDateInput = fromDate.props.children[1].props.children[0];
      expect(fromDateInput.type).toEqual(DatePicker);
      expect(fromDateInput.props.dateTime).toEqual('2015-07-01');
      expect(fromDateInput.props.disabled).toEqual(false);

      let toDateInput = toDate.props.children[1].props.children[0];
      expect(toDateInput.type).toEqual(DatePicker);
      expect(toDateInput.props.dateTime).toEqual('2015-08-03');
      expect(fromDateInput.props.disabled).toEqual(false);
    });
  });

  describe('select date range', () => {
    it('calls an action', () => {
      let dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter dateRanges={dateRanges} currentDateRange={dateRanges[1]} onChange={onChangeSpy} />
      );

      dateRangeFilter.refs.dateRangeSelect.props.onChange({target: {value: '1'}});
      expect(onChangeSpy).toHaveBeenCalledWith({id: 1});
    });
  });

  describe('change from date', () => {
    it('updates store date ranges', () => {
      let dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter dateRanges={dateRanges} currentDateRange={dateRanges[0]} onChange={onChangeSpy} />
      );

      dateRangeFilter.refs.fromDate.props.onChange('2000-07-14');
      expect(onChangeSpy).toHaveBeenCalledWith({fromDate: '2000-07-14'});
    });
  });

  describe('change to date', () => {
    it('updates store date ranges', () => {
      let dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter dateRanges={dateRanges} currentDateRange={dateRanges[0]} onChange={onChangeSpy} />
      );

      dateRangeFilter.refs.toDate.props.onChange('2000-07-15');
      expect(onChangeSpy).toHaveBeenCalledWith({toDate: '2000-07-15'});
    });
  });
});