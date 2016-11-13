import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import DropDownItem from '../drop-down-item';

describe('DropDownItem', () => {
  let onClickSpy;
  beforeEach(() => {
    onClickSpy = jasmine.createSpy('onClickSpy');
  });

  describe('render', () => {
    it('renders a list item with item label', () => {
      const dropdownItem = shallowRenderer(<DropDownItem value={2} label="Two" onClick={onClickSpy} />);
      expect(dropdownItem.props.children).toEqual('   Two');
    });

    it('renders a tick next to the label when selected is true', () => {
      const dropdownItem = shallowRenderer(<DropDownItem value={2} label="Three" selected onClick={onClickSpy} />);
      expect(dropdownItem.props.children).toEqual('✓ Three');
    });
  });

  describe('events', () => {
    it('calls onClick prop when option clicked', () => {
      const dropdownItem = shallowRenderer(<DropDownItem value={2} label="Two" onClick={onClickSpy} />);

      dropdownItem.props.onClick();
      expect(onClickSpy).toHaveBeenCalledWith(2, 'Two');
    });
  });
});
