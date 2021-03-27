import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import FormControl from '../form-control';

describe('FormControl', () => {
  describe('render', () => {
    it('creates a form control with help block', () => {
      const errorStateSpy = jasmine.createSpy('errorStateSpy');
      errorStateSpy.and.returnValue('some-error');

      const errorForSpy = jasmine.createSpy('errorForSpy');
      errorForSpy.and.returnValue('Error text');

      const validator = {
        errorState: errorStateSpy,
        errorFor: errorForSpy,
      };
      const formControl = shallowRenderer(
        <FormControl name="notes" label="Notes" validator={validator}>Child</FormControl>
      );
      const [label, child, helpBlock] = formControl.props.children;

      expect(formControl.props.className).toEqual('form-group some-error');

      expect(label.props.className).toEqual('control-label');
      expect(label.props.children).toEqual('Notes');
      expect(child).toEqual('Child');
      expect(helpBlock.props.className).toEqual('help-block');
      expect(helpBlock.props.children).toEqual('Error text');
    });

    it('creates a form control without help block if validator not provided', () => {
      const formControl = shallowRenderer(
        <FormControl name="notes" label="Notes">Child</FormControl>
      );

      const [label, child, helpBlock] = formControl.props.children;

      expect(formControl.props.className).toEqual('form-group has-success');
      expect(label.props.className).toEqual('control-label');
      expect(label.props.children).toEqual('Notes');
      expect(child).toEqual('Child');
      expect(helpBlock).toEqual(<div />);
    });
  });
});
