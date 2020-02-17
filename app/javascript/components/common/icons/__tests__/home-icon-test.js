import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import HomeIcon from '../home-icon';

describe('HomeIcon', () => {
  it('is a span with a font awesome home icon', () => {
    const icon = shallowRenderer(<HomeIcon />);

    expect(icon.type).toEqual('span');
    expect(icon.props.children[1].props.className).toMatch(/fa-home/);
  });
});
