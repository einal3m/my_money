import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';

import Picker from '../picker';
import { DropdownButton, MenuItem } from 'react-bootstrap';

describe('Picker', () => {
  let picker, options, onChangeSpy;
  beforeEach(() => {
    options = [
      { id: 1, name: 'One' },
      { id: 3, name: 'Two' },
      { id: 5, name: 'Three' }
    ];

    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('when no item selected', () => {
      picker = shallowRenderer(
        <Picker options={options} value={null} onChange={onChangeSpy} />
      );

      let dropdown = picker.props.children;

      expect(dropdown.type).toEqual(DropdownButton);
      expect(dropdown.props.title).toEqual('Please select...');

      let menuItems = dropdown.props.children;
      expect(menuItems.length).toEqual(3);

      expect(menuItems[0].props.children).toEqual('   One');
      expect(menuItems[1].props.children).toEqual('   Three');
      expect(menuItems[2].props.children).toEqual('   Two');
    });

    it('when an item is selected', () => {
      picker = shallowRenderer(
        <Picker options={options} value={5} onChange={onChangeSpy} />
      );

      let dropdown = picker.props.children;

      expect(dropdown.type).toEqual(DropdownButton);
      expect(dropdown.props.title).toEqual('Three');

      let menuItems = dropdown.props.children;
      expect(menuItems.length).toEqual(3);

      expect(menuItems[0].props.children).toEqual('   One');
      expect(menuItems[1].props.children).toEqual('✓ Three');
      expect(menuItems[2].props.children).toEqual('   Two');
    });
  });

  describe('events', () => {
    it('selecting item calls the onChange prop', () => {
      picker = shallowRenderer(
        <Picker options={options} value={5} onChange={onChangeSpy} />
      );

      let dropdown = picker.props.children;
      dropdown.props.onSelect({}, '4');

      expect(onChangeSpy).toHaveBeenCalledWith(4);
    });
  });
});
