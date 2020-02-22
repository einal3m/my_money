import React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import NewModelButtons from '../new-model-buttons';
import * as formActions from '../../../../actions/form-actions';

describe('NewModelButtons', () => {
  describe('render', () => {
    it('has a header with buttons', () => {
      const dropdown = shallowRenderer(<NewModelButtons modelTypes={['One', 'Two']} />);

      expect(dropdown.type).toEqual(Dropdown);
      expect(dropdown.props.children[0].props.children[1]).toMatch(/New/);

      const buttons = dropdown.props.children[1];
      expect(buttons.props.children[0].type).toEqual(MenuItem);
      expect(buttons.props.children[0].props.children).toEqual('New One');

      expect(buttons.props.children[1].type).toEqual(MenuItem);
      expect(buttons.props.children[1].props.children).toEqual('New Two');
    });
  });

  describe('events', () => {
    it('calls the showModalForm action with the correct model', () => {
      spyOn(formActions, 'showFormModal');
      const dropdown = shallowRenderer(<NewModelButtons modelTypes={['One', 'Two']} />);
      dropdown.props.onSelect('One');

      expect(formActions.showFormModal).toHaveBeenCalledWith('One', {}, { allowDelete: false });
    });
  });
});
