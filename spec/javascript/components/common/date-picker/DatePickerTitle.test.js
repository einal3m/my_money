import React from 'react';
import moment from 'moment';
import DatePickerTitle from '../date-picker-title';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import {
  DATE_PICKER_DAY_MODE,
  DATE_PICKER_MONTH_MODE,
  DATE_PICKER_YEAR_MODE } from '../date-picker-constants';

describe('DatePickerTitle', () => {
  const viewDate = moment('2013-02-08');
  let handlePreviousSpy;
  let handleNextSpy;
  let setViewSpy;
  let props;

  beforeEach(() => {
    handlePreviousSpy = jasmine.createSpy('handlePreviousSpy');
    handleNextSpy = jasmine.createSpy('handleNextSpy');
    setViewSpy = jasmine.createSpy('setViewSpy');
    props = {
      viewDate,
      handlePrevious: handlePreviousSpy,
      handleNext: handleNextSpy,
      setView: setViewSpy,
    };
  });

  describe('render', () => {
    describe('days view mode', () => {
      it('displays left and right arrows, and a title', () => {
        const datePickerTitle = shallowRenderer(<DatePickerTitle {...props} viewMode={DATE_PICKER_DAY_MODE} />);
        const [previous, title, next] = datePickerTitle.props.children;

        expect(previous.type).toEqual('button');
        expect(previous.props.children.props.className).toMatch(/fa-chevron-left/);

        expect(title.type).toEqual('button');
        expect(title.props.disabled).toEqual(false);
        expect(title.props.children).toEqual('February 2013');

        expect(next.type).toEqual('button');
        expect(next.props.children.props.className).toMatch(/fa-chevron-right/);
      });
    });

    describe('months view mode', () => {
      it('displays left and right arrows, and a title', () => {
        const datePickerTitle = shallowRenderer(<DatePickerTitle {...props} viewMode={DATE_PICKER_MONTH_MODE} />);
        const [previous, title, next] = datePickerTitle.props.children;

        expect(previous.props.children.props.className).toMatch(/fa-chevron-left/);

        expect(title.props.disabled).toEqual(false);
        expect(title.props.children).toEqual('2013');

        expect(next.props.children.props.className).toMatch(/fa-chevron-right/);
      });
    });

    describe('years view mode', () => {
      it('displays left and right arrows, and a non-clickable title', () => {
        const datePickerTitle = shallowRenderer(<DatePickerTitle {...props} viewMode={DATE_PICKER_YEAR_MODE} />);
        const [previous, title, next] = datePickerTitle.props.children;

        expect(previous.props.children.props.className).toMatch(/fa-chevron-left/);

        expect(title.props.disabled).toEqual(true);
        expect(title.props.children).toEqual('2013 - 2022');

        expect(next.props.children.props.className).toMatch(/fa-chevron-right/);
      });
    });
  });

  describe('events', () => {
    it('day view', () => {
      const datePickerTitle = shallowRenderer(<DatePickerTitle {...props} viewMode={DATE_PICKER_DAY_MODE} />);
      const [previous, title, next] = datePickerTitle.props.children;

      previous.props.onClick();
      expect(handlePreviousSpy).toHaveBeenCalledWith(1, 'month');

      next.props.onClick();
      expect(handleNextSpy).toHaveBeenCalledWith(1, 'month');

      title.props.onClick();
      expect(setViewSpy).toHaveBeenCalledWith(DATE_PICKER_MONTH_MODE);
    });

    it('month view', () => {
      const datePickerTitle = shallowRenderer(<DatePickerTitle {...props} viewMode={DATE_PICKER_MONTH_MODE} />);
      const [previous, title, next] = datePickerTitle.props.children;

      previous.props.onClick();
      expect(handlePreviousSpy).toHaveBeenCalledWith(1, 'year');

      next.props.onClick();
      expect(handleNextSpy).toHaveBeenCalledWith(1, 'year');

      title.props.onClick();
      expect(setViewSpy).toHaveBeenCalledWith(DATE_PICKER_YEAR_MODE);
    });

    it('year view', () => {
      const datePickerTitle = shallowRenderer(<DatePickerTitle {...props} viewMode={DATE_PICKER_YEAR_MODE} />);
      const [previous, title, next] = datePickerTitle.props.children;

      previous.props.onClick();
      expect(handlePreviousSpy).toHaveBeenCalledWith(10, 'years');

      next.props.onClick();
      expect(handleNextSpy).toHaveBeenCalledWith(10, 'years');

      title.props.onClick();
      expect(setViewSpy).not.toHaveBeenCalled();
    });
  });
});
