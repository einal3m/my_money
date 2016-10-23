import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import Header from '../header';
import { Navbar } from 'react-bootstrap';

describe('Header', () => {
  it('has a menu and some links', () => {
    const header = shallowRenderer(<Header />);
    expect(header.type).toEqual(Navbar);
  });
});
