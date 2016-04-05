import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';

import SubcategoryPicker from '../subcategory-picker';
import { DropdownButton, MenuItem } from 'react-bootstrap';

describe('SubcategoryPicker', () => {
  let subcategoryPicker, subcategories, onChangeSpy;
  beforeEach(() => {
    subcategories = [
      { id: 1, name: 'One' },
      { id: 3, name: 'Two' },
      { id: 2, name: 'Three' }
    ];

    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('when no subcategory selected', () => {
      subcategoryPicker = shallowRenderer(
        <SubcategoryPicker subcategories={subcategories} value={null} onChange={onChangeSpy} />
      );

      let dropdown = subcategoryPicker.props.children;

      expect(dropdown.type).toEqual(DropdownButton);
      expect(dropdown.props.title).toEqual('Please select...');

      let menuItems = dropdown.props.children;
      expect(menuItems.length).toEqual(3);

      expect(menuItems[0].props.children).toEqual('   One');
      expect(menuItems[1].props.children).toEqual('   Two');
      expect(menuItems[2].props.children).toEqual('   Three');
    });

    it('when a subcategory is selected', () => {
      subcategoryPicker = shallowRenderer(
        <SubcategoryPicker subcategories={subcategories} value={2} onChange={onChangeSpy} />
      );

      let dropdown = subcategoryPicker.props.children;

      expect(dropdown.type).toEqual(DropdownButton);
      expect(dropdown.props.title).toEqual('Three');

      let menuItems = dropdown.props.children;
      expect(menuItems.length).toEqual(3);

      expect(menuItems[0].props.children).toEqual('   One');
      expect(menuItems[1].props.children).toEqual('   Two');
      expect(menuItems[2].props.children).toEqual('✓ Three');
    });
  });

  describe('events', () => {
    it('selecting menuitem calls the onChange prop', () => {
      subcategoryPicker = shallowRenderer(
        <SubcategoryPicker subcategories={subcategories} value={2} onChange={onChangeSpy} />
      );

      let dropdown = subcategoryPicker.props.children;
      dropdown.props.onSelect({}, '4');

      expect(onChangeSpy).toHaveBeenCalledWith(4);
    });
  });
});
