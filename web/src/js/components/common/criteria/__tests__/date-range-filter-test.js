import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import dateRangeActions from '../../../../actions/date-range-actions';
import { DateRangeFilter } from '../date-range-filter';
import { Input, Button } from 'react-bootstrap';
import { fromJS } from 'immutable';
import DatePicker from '../../date-picker/DateTimeField';

describe('DateRangeFilter', () => {
  let dateRanges, fetchSpy;
  beforeEach(() => {
    spyOn(dateRangeActions, 'getDateRanges');

    dateRanges = [
      { id: 11, name: 'Name1', custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];

    fetchSpy = jasmine.createSpy('fetchSpy');
  });

  describe('render', () => {
    it('does not render when date ranges not loaded', () => {
      let dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded={false} dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );

      expect(dateRangeActions.getDateRanges).toHaveBeenCalled();
      expect(dateRangeFilter.props.children).toBeUndefined();
    });

    it('has a select with date range options', () => {
      let dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );

      let [dateRange, fromDate, toDate] = dateRangeFilter.props.children;

      let select = dateRange.props.children.props.children;
      expect(select.type).toEqual(Input);
      expect(select.props.value).toEqual(22);
      expect(select.props.children[0].type).toEqual('option');
      expect(select.props.children[0].props.children).toEqual('Name1');
      expect(select.props.children[1].type).toEqual('option');
      expect(select.props.children[1].props.children).toEqual('Name2');
    });

    it('disables the from and to date if date range is not custom', () => {
      let dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );
      let [dateRange, fromDate, toDate] = dateRangeFilter.props.children;

      let fromDateInput = fromDate.props.children.props.children.props.children[1].props.children[0];
      expect(fromDateInput.type).toEqual(DatePicker);
      expect(fromDateInput.props.dateTime).toEqual('2014-06-23');
      expect(fromDateInput.props.disabled).toEqual(true);

      let toDateInput = toDate.props.children.props.children.props.children[1].props.children[0];
      expect(toDateInput.type).toEqual(DatePicker);
      expect(toDateInput.props.dateTime).toEqual('2014-09-03');
      expect(fromDateInput.props.disabled).toEqual(true);
    });

    it('enables the from and to date if date range is custom', () => {
      let dateRangeFilter = shallowRenderer(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[0]} fetch={fetchSpy} />
      );
      let [dateRange, fromDate, toDate] = dateRangeFilter.props.children;

      let fromDateInput = fromDate.props.children.props.children.props.children[1].props.children[0];
      expect(fromDateInput.type).toEqual(DatePicker);
      expect(fromDateInput.props.dateTime).toEqual('2015-07-01');
      expect(fromDateInput.props.disabled).toEqual(false);

      let toDateInput = toDate.props.children.props.children.props.children[1].props.children[0];
      expect(toDateInput.type).toEqual(DatePicker);
      expect(toDateInput.props.dateTime).toEqual('2015-08-03');
      expect(fromDateInput.props.disabled).toEqual(false);
    });
  });

  describe('select date range', () => {
    it('calls an action', () => {
      spyOn(dateRangeActions, 'setCurrentDateRange');

      let dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[1]} fetch={fetchSpy} />
      );
      dateRangeFilter.refs.dateRangeSelect.props.onChange({target: {value: '11'}});

      expect(dateRangeActions.setCurrentDateRange).toHaveBeenCalledWith(11);
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  describe('change from date', () => {
    it('updates store date ranges', () => {
      spyOn(dateRangeActions, 'updateCurrentDateRange');

      let dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[0]} fetch={fetchSpy} />
      );
      dateRangeFilter.refs.fromDate.props.onChange('2000-07-14');

      expect(dateRangeActions.updateCurrentDateRange).toHaveBeenCalledWith({fromDate: '2000-07-14'});
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  describe('change to date', () => {
    it('updates store date ranges', () => {
      spyOn(dateRangeActions, 'updateCurrentDateRange');

      let dateRangeFilter = TestUtils.renderIntoDocument(
        <DateRangeFilter loaded dateRanges={dateRanges} currentDateRange={dateRanges[0]} fetch={fetchSpy} />
      );
      dateRangeFilter.refs.toDate.props.onChange('2000-07-15');

      expect(dateRangeActions.updateCurrentDateRange).toHaveBeenCalledWith({toDate: '2000-07-15'});
      expect(fetchSpy).toHaveBeenCalledWith();
    });
  });

});
