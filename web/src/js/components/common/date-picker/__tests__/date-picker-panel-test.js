import React from 'react';
import DatePickerPanel from '../date-picker-panel';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';

describe('DatePickerPanel', () => {
  let onClickSpy;

  beforeEach(() => {
    onClickSpy = jasmine.createSpy('onClickSpy');
  });

  describe('render', () => {
    it('shows a button with muted value', () => {
      const datePickerPanel = shallowRenderer(
        <DatePickerPanel value={{ date: 1 }} label="myLabel" muted onClick={onClickSpy} />
      );

      expect(datePickerPanel.type).toEqual('button');
      expect(datePickerPanel.props.className).toMatch(/text-muted/);
      expect(datePickerPanel.props.children).toEqual('myLabel');
    });

    it('shows a button with non-muted value', () => {
      const datePickerPanel = shallowRenderer(
        <DatePickerPanel value={{ date: 1 }} label="myLabel" muted={false} onClick={onClickSpy} />
      );

      expect(datePickerPanel.type).toEqual('button');
      expect(datePickerPanel.props.className).not.toMatch(/text-muted/);
      expect(datePickerPanel.props.children).toEqual('myLabel');
    });
  });

  describe('onClick', () => {
    it('calls the onClick prop', () => {
      const datePickerPanel = shallowRenderer(
        <DatePickerPanel value={{ date: 1 }} label="myLabel" muted onClick={onClickSpy} />
      );

      datePickerPanel.props.onClick();

      expect(onClickSpy).toHaveBeenCalledWith({ date: 1 });
    });
  });
});
