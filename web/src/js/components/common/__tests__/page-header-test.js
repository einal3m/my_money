import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import PageHeader from '../page-header';
import apiStatusActions from '../../../actions/api-status-actions';

describe('PageHeader', () => {
  describe('render', () => {
    let title;
    let buttonGroup;
    beforeEach(() => {
      const apiStatus = { status: 'done' };
      const pageHeader = shallowRenderer(<PageHeader title="myTitle" apiStatus={apiStatus}>myChild</PageHeader>);
      [title, buttonGroup] = pageHeader.props.children.props.children.props.children.props.children;
    });

    it('has a title', () => {
      const [h1, status] = title.props.children;

      expect(h1.props.children.props.children).toEqual('myTitle');
      expect(h1.props.children.type).toEqual('h1');
      expect(status.props.children).toBeUndefined();
    });

    it('has a buttonGroup with children', () => {
      expect(buttonGroup.props.children.props.children).toEqual('myChild');
    });
  });

  describe('api status', () => {
    it('loading', () => {
      const pageHeader = shallowRenderer(
        <PageHeader title="myTitle" apiStatus={{ status: 'loading' }}>myChild</PageHeader>
      );
      const status = pageHeader.props.children.props.children.props.children.props.children[0].props.children[1];
      expect(status.props.children).toEqual('Loading...');
    });

    it('saving', () => {
      const pageHeader = shallowRenderer(
        <PageHeader title="myTitle" apiStatus={{ status: 'saving' }}>myChild</PageHeader>
      );
      const status = pageHeader.props.children.props.children.props.children.props.children[0].props.children[1];
      expect(status.props.children).toEqual('Saving...');
    });

    it('deleting', () => {
      const pageHeader = shallowRenderer(
        <PageHeader title="myTitle" apiStatus={{ status: 'deleting' }}>myChild</PageHeader>
      );
      const status = pageHeader.props.children.props.children.props.children.props.children[0].props.children[1];
      expect(status.props.children).toEqual('Deleting...');
    });

    it('error', () => {
      const pageHeader = shallowRenderer(
        <PageHeader title="myTitle" apiStatus={{ status: 'error', message: 'myMessage' }}>myChild</PageHeader>
      );
      const status = pageHeader.props.children.props.children.props.children.props.children[0].props.children[1];
      const [error, message, _x] = status.props.children.props.children;

      expect(error).toEqual('Error: ');
      expect(message).toEqual('myMessage');
    });
  });

  describe('clear error', () => {
    it('click clears the error', () => {
      const pageHeader = TestUtils.renderIntoDocument(
        <PageHeader title="myTitle" apiStatus={{ status: 'error', message: 'myMessage' }}>myChild</PageHeader>
      );
      spyOn(apiStatusActions, 'clearApiError');

      const clearError = pageHeader.refs.clearError;
      TestUtils.Simulate.click(clearError);

      expect(apiStatusActions.clearApiError).toHaveBeenCalled();
    });
  });
});
