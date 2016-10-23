import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import Footer from '../footer';

describe('Footer', () => {
  it('has a 3 sections with links', () => {
    const footer = shallowRenderer(<Footer />);
    expect(footer.props.children.props.children.length).toEqual(3);
  });
});
