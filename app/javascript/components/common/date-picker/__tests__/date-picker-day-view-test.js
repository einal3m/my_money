import React from 'react';
import moment from 'moment';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import DatePickerDayView from '../date-picker-day-view';
import DatePickerPanel from '../date-picker-panel';

describe('DatePickerDayView', () => {
  const viewDate = moment('2016-11-19');
  let closePickerSpy;
  beforeEach(() => {
    closePickerSpy = jasmine.createSpy('closePickerSpy');
  });

  describe('render', () => {
    it('displays a grid of a decade of years with two extra muted years', () => {
      const view = shallowRenderer(
        <DatePickerDayView viewDate={viewDate} closePicker={closePickerSpy} />
      );
      expect(view.type).toEqual('table');

      const headerRow = view.props.children[0].props.children;
      expect(headerRow.props.children[0].props.children).toEqual('Su');

      const rows = view.props.children[1].props.children;
      expect(rows.length).toEqual(5);

      const cell30Oct = rows[0].props.children[0].props.children;
      const cell31Oct = rows[0].props.children[1].props.children;
      const cell1Nov = rows[0].props.children[2].props.children;
      const cell8Nov = rows[1].props.children[2].props.children;
      const cell30Nov = rows[4].props.children[3].props.children;
      const cell1Dec = rows[4].props.children[4].props.children;
      const cell3Dec = rows[4].props.children[6].props.children;

      const verifyCell = (cell, date, month, year, muted) => {
        expect(cell.type).toEqual(DatePickerPanel);
        expect(cell.props.label).toEqual(`${date}`);
        expect(cell.props.value).toEqual({ date, month, year });
        expect(cell.props.muted).toEqual(muted);
      };

      verifyCell(cell30Oct, 30, 9, 2016, true);
      verifyCell(cell31Oct, 31, 9, 2016, true);
      verifyCell(cell1Nov, 1, 10, 2016, false);
      verifyCell(cell8Nov, 8, 10, 2016, false);
      verifyCell(cell30Nov, 30, 10, 2016, false);
      verifyCell(cell1Dec, 1, 11, 2016, true);
      verifyCell(cell3Dec, 3, 11, 2016, true);
    });
  });

  describe('events', () => {
    it('click on cell calls setView and setDate', () => {
      const view = shallowRenderer(
        <DatePickerDayView viewDate={viewDate} closePicker={closePickerSpy} />
      );

      const rows = view.props.children[1].props.children;
      const cell8Nov = rows[1].props.children[2].props.children;

      cell8Nov.props.onClick('dayInfo');

      expect(closePickerSpy).toHaveBeenCalledWith('dayInfo');
    });
  });
});
