import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import BankIcon from '../bank-icon';

describe('BankIcon', () => {
  it('is a span with a font awesome bank icon', () => {
    const icon = shallowRenderer(<BankIcon />);

    expect(icon.type).toEqual('span');
    expect(icon.props.children[1].props.className).toMatch(/fa-bank/);
  });
});
