import React from 'react';
import { Navbar } from 'react-bootstrap';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import Header from '../header';

describe('Header', () => {
  it('has a menu and some links', () => {
    const header = shallowRenderer(<Header />);
    expect(header.type).toEqual(Navbar);
  });
});
