import React from 'react';
import moment from 'moment';
import DatePickerPopover from '../date-picker-popover';
import DatePickerDayView from '../date-picker-day-view';
import DatePickerTitle from '../date-picker-title';
import DatePickerMonthView from '../date-picker-month-view';
import DatePickerYearView from '../date-picker-year-view';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import {
  DATE_PICKER_DAY_MODE,
  DATE_PICKER_MONTH_MODE,
  DATE_PICKER_YEAR_MODE } from '../date-picker-constants';

describe('DatePickerPopover', () => {
  let props;
  beforeEach(() => {
    props = {
      viewDate: moment(),
      handlePrevious: jasmine.createSpy('handlePreviousSpy'),
      handleNext: jasmine.createSpy('handleNextSpy'),
      setView: jasmine.createSpy('setViewSpy'),
      setDate: jasmine.createSpy('setDateSpy'),
      closePicker: jasmine.createSpy('closePickerSpy'),
    };
  });

  describe('render', () => {
    it('day view if viewMode is "days"', () => {
      props.viewMode = DATE_PICKER_DAY_MODE;
      const view = shallowRenderer(<DatePickerPopover {...props} />);
      const [title, dayView] = view.props.children;

      expect(title.type).toEqual(DatePickerTitle);
      expect(title.props).toEqual(props);

      expect(dayView.type).toEqual(DatePickerDayView);
      expect(dayView.props).toEqual(props);
    });

    it('month view if viewMode is "months"', () => {
      props.viewMode = DATE_PICKER_MONTH_MODE;
      const view = shallowRenderer(<DatePickerPopover {...props} />);
      const [title, dayView] = view.props.children;

      expect(title.type).toEqual(DatePickerTitle);
      expect(title.props).toEqual(props);

      expect(dayView.type).toEqual(DatePickerMonthView);
      expect(dayView.props).toEqual(props);
    });

    it('year view if viewMode is "years"', () => {
      props.viewMode = DATE_PICKER_YEAR_MODE;
      const view = shallowRenderer(<DatePickerPopover {...props} />);
      const [title, dayView] = view.props.children;

      expect(title.type).toEqual(DatePickerTitle);
      expect(title.props).toEqual(props);

      expect(dayView.type).toEqual(DatePickerYearView);
      expect(dayView.props).toEqual(props);
    });
  });
});
