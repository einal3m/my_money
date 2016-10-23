import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import Button from '../button';

describe('Button', () => {
  it('renders a button with child', () => {
    const button = shallowRenderer(<Button type="danger">Child</Button>);
    expect(button.type).toEqual('button');
    expect(button.props.className).toEqual('btn btn-danger');
    expect(button.props.children).toEqual('Child');
  });
});
