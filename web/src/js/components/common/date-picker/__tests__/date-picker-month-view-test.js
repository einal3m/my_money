import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import DatePickerMonthView from '../date-picker-month-view';
import DatePickerPanel from '../date-picker-panel';
import { DATE_PICKER_DAY_MODE } from '../date-picker-constants';

describe('DatePickerYearView', () => {
  let setViewSpy;
  let setDateSpy;
  beforeEach(() => {
    setViewSpy = jasmine.createSpy('setViewSpy');
    setDateSpy = jasmine.createSpy('setDateSpy');
  });

  describe('render', () => {
    it('displays a grid of a decade of years with two extra muted years', () => {
      const view = shallowRenderer(
        <DatePickerMonthView setView={setViewSpy} setDate={setDateSpy} />
      );
      const rows = view.props.children.props.children;
      const cell00 = rows[0].props.children[0].props.children;
      const cell01 = rows[0].props.children[1].props.children;
      const cell02 = rows[0].props.children[2].props.children;
      const cell03 = rows[0].props.children[3].props.children;
      const cell10 = rows[1].props.children[0].props.children;
      const cell11 = rows[1].props.children[1].props.children;
      const cell12 = rows[1].props.children[2].props.children;
      const cell13 = rows[1].props.children[3].props.children;
      const cell20 = rows[2].props.children[0].props.children;
      const cell21 = rows[2].props.children[1].props.children;
      const cell22 = rows[2].props.children[2].props.children;
      const cell23 = rows[2].props.children[3].props.children;

      expect(view.type).toEqual('table');

      const verifyCell = (cell, label, month) => {
        expect(cell.type).toEqual(DatePickerPanel);
        expect(cell.props.label).toEqual(label);
        expect(cell.props.value).toEqual({ month });
        expect(cell.props.muted).toEqual(false);
      };

      verifyCell(cell00, 'Jan', 0);
      verifyCell(cell01, 'Feb', 1);
      verifyCell(cell02, 'Mar', 2);
      verifyCell(cell03, 'Apr', 3);
      verifyCell(cell10, 'May', 4);
      verifyCell(cell11, 'Jun', 5);
      verifyCell(cell12, 'Jul', 6);
      verifyCell(cell13, 'Aug', 7);
      verifyCell(cell20, 'Sep', 8);
      verifyCell(cell21, 'Oct', 9);
      verifyCell(cell22, 'Nov', 10);
      verifyCell(cell23, 'Dec', 11);
    });
  });

  describe('events', () => {
    it('click on cell calls setView and setDate', () => {
      const view = shallowRenderer(
        <DatePickerMonthView setView={setViewSpy} setDate={setDateSpy} />
      );

      const rows = view.props.children.props.children;
      const cell12 = rows[1].props.children[2].props.children;
      cell12.props.onClick('monthInfo');

      expect(setViewSpy).toHaveBeenCalledWith(DATE_PICKER_DAY_MODE);
      expect(setDateSpy).toHaveBeenCalledWith('monthInfo');
    });
  });
});
