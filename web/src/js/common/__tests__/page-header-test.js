import shallowRenderer from '../../util/__tests__/shallow-renderer';
import React from 'react';
import PageHeader from '../page-header';

describe('PageHeader', () => {
  let title, buttonGroup;
  beforeEach(() => {
    let pageHeader = shallowRenderer(<PageHeader title="myTitle">myChild</PageHeader>);
    [title, buttonGroup] = pageHeader.props.children.props.children.props.children;
  });

  it('has a title', () => {
    expect(title.props.children.props.children).toEqual('myTitle');
    expect(title.props.children.type).toEqual('h1');
  });

  it('has a buttonGroup with children', () => {
    expect(buttonGroup.props.children.props.children).toEqual('myChild');
  });
});
