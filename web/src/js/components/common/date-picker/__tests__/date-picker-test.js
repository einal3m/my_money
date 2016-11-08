import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import DatePicker from '../date-picker';

describe('DatePicker', () => {
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('displays an input, with an addon that triggers an overly', () => {
      const datePicker = shallowRenderer(<DatePicker value="2016-12-19" onChange={onChangeSpy} name="picker" />);

      const [input, overlay] = datePicker.props.children;
      const addon = overlay.props.children;

      expect(input.type).toEqual('input');
      expect(input.props.value).toEqual('19-Dec-2016');
      expect(input.props.name).toEqual('picker');
      expect(input.props.disabled).toBeUndefined();

      expect(overlay.type).toEqual(OverlayTrigger);
      expect(addon.props.className).toMatch(/addon/);
    });

    it('disables the input and overlay if disabled is true', () => {
      const datePicker = shallowRenderer(
        <DatePicker value="2016-12-19" onChange={onChangeSpy} name="picker" disabled />
      );
      const [input, addon] = datePicker.props.children;

      expect(input.type).toEqual('input');
      expect(input.props.value).toEqual('19-Dec-2016');
      expect(input.props.name).toEqual('picker');
      expect(input.props.disabled).toEqual(true);

      expect(addon.props.className).toMatch(/addon/);
    });
  });

  describe('DatePickerPopover callbacks', () => {
    let datePicker;
    let datePickerView;
    beforeEach(() => {
      datePicker = TestUtils.renderIntoDocument(
        <DatePicker value="2016-12-19" onChange={onChangeSpy} name="picker" />
      );
      const overlay = TestUtils.findRenderedComponentWithType(datePicker, OverlayTrigger);
      datePickerView = overlay.props.overlay.props.children;
    });

    it('setView sets the view mode state', () => {
      spyOn(datePicker, 'setState');
      datePickerView.props.setView('newMode');
      expect(datePicker.setState).toHaveBeenCalledWith({ viewMode: 'newMode' });
    });

    it('setDate sets the view date state', () => {
      spyOn(datePicker, 'setState');
      datePickerView.props.setDate({ month: 8 });
      expect(datePicker.setState.calls.argsFor(0)[0].viewDate.isSame(moment('2016-09-19'))).toBeTruthy();
    });

    it('closePicker sets the view date and display date state, clicks on the input to close the popover', () => {
      spyOn(datePicker, 'setState');
      spyOn(datePicker.inputField, 'click');

      datePickerView.props.closePicker({ date: 2, month: 7, year: 2016 });

      expect(datePicker.state.viewDate.isSame(moment('2016-08-02'))).toBeTruthy();
      expect(datePicker.setState).toHaveBeenCalledWith({ displayDate: '02-Aug-2016' });
      expect(datePicker.inputField.click).toHaveBeenCalled();
    });

    it('handlePrevious subtracts the params from the view date state', () => {
      spyOn(datePicker, 'setState');
      datePickerView.props.handlePrevious(8, 'months');
      expect(datePicker.setState.calls.argsFor(0)[0].viewDate.isSame(moment('2016-04-19'))).toBeTruthy();
    });

    it('handleNext adds the params from the view date state', () => {
      spyOn(datePicker, 'setState');
      datePickerView.props.handleNext(8, 'months');
      expect(datePicker.setState.calls.argsFor(0)[0].viewDate.isSame(moment('2017-08-19'))).toBeTruthy();
    });
  });
});
