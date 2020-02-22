import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import HorizontalFormControl from '../horizontal-form-control';

describe('HorizontalFormControl', () => {
  describe('render', () => {
    it('creates a horizontal form control', () => {
      const formControl = shallowRenderer(
        <HorizontalFormControl name="notes" label="Notes" labelCol="4" controlCol="6">Child</HorizontalFormControl>
      );

      expect(formControl.props.className).toEqual('form-horizontal');

      const formGroup = formControl.props.children;
      expect(formGroup.props.className).toEqual('form-group');

      const [label, child] = formGroup.props.children;

      expect(label.props.className).toEqual('col-xs-4 control-label');
      expect(label.props.children).toEqual('Notes');
      expect(child.props.className).toEqual('col-xs-6');
      expect(child.props.children).toEqual('Child');
    });
  });
});
