import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import PiggyBankIcon from '../piggy-bank-icon';

describe('PiggyBankIcon', () => {
  it('is a span with a font awesome home icon', () => {
    const icon = shallowRenderer(<PiggyBankIcon />);

    expect(icon.type).toEqual('img');
    expect(icon.props.width).toEqual(35);
    expect(icon.props.height).toEqual(35);
  });
});
