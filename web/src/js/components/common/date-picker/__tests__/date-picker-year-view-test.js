import React from 'react';
import moment from 'moment';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import DatePickerYearView from '../date-picker-year-view';
import DatePickerPanel from '../date-picker-panel';
import { DATE_PICKER_MONTH_MODE } from '../date-picker-constants';

describe('DatePickerYearView', () => {
  const viewDate = moment('1990-12-19');
  let setViewSpy;
  let setDateSpy;
  beforeEach(() => {
    setViewSpy = jasmine.createSpy('setViewSpy');
    setDateSpy = jasmine.createSpy('setDateSpy');
  });

  describe('render', () => {
    it('displays a grid of a decade of years with two extra muted years', () => {
      const view = shallowRenderer(
        <DatePickerYearView viewDate={viewDate} setView={setViewSpy} setDate={setDateSpy} />
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

      const verifyCell = (cell, year, muted) => {
        expect(cell.type).toEqual(DatePickerPanel);
        expect(cell.props.label).toEqual(`${year}`);
        expect(cell.props.value).toEqual({ year });
        expect(cell.props.muted).toEqual(muted);
      };

      verifyCell(cell00, 1989, true);
      verifyCell(cell01, 1990, false);
      verifyCell(cell02, 1991, false);
      verifyCell(cell03, 1992, false);
      verifyCell(cell10, 1993, false);
      verifyCell(cell11, 1994, false);
      verifyCell(cell12, 1995, false);
      verifyCell(cell13, 1996, false);
      verifyCell(cell20, 1997, false);
      verifyCell(cell21, 1998, false);
      verifyCell(cell22, 1999, false);
      verifyCell(cell23, 2000, true);
    });
  });

  describe('events', () => {
    it('click on cell calls setView and setDate', () => {
      const view = shallowRenderer(
        <DatePickerYearView viewDate={viewDate} setView={setViewSpy} setDate={setDateSpy} />
      );

      const rows = view.props.children.props.children;
      const cell12 = rows[1].props.children[2].props.children;
      cell12.props.onClick('yearInfo');

      expect(setViewSpy).toHaveBeenCalledWith(DATE_PICKER_MONTH_MODE);
      expect(setDateSpy).toHaveBeenCalledWith('yearInfo');
    });
  });
});
