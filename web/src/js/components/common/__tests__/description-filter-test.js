import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import DescriptionFilter from '../description-filter';

describe('DescriptionFilter', () => {
  let description;
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChange');
    description = 'my String';
  });

  describe('render', () => {
    it('has an input', () => {
      const descriptionFilter = shallowRenderer(<DescriptionFilter description={description} onChange={onChangeSpy} />);
      const input = descriptionFilter.props.children.props.children.props.children[1];

      expect(input.type).toEqual('input');
      expect(input.props.defaultValue).toEqual('my String');
    });
  });

  describe('onChange event', () => {
    let descriptionFilter;
    beforeEach(() => {
      descriptionFilter = TestUtils.renderIntoDocument(
        <DescriptionFilter description={description} onChange={onChangeSpy} />
      );
    });

    it('when blur from input', () => {
      TestUtils.Simulate.blur(descriptionFilter.refs.descriptionInput, { target: { value: 'new String' } });
      expect(onChangeSpy).toHaveBeenCalledWith('new String');
    });

    it('when enter key pressed', () => {
      TestUtils.Simulate.keyPress(
        descriptionFilter.refs.descriptionInput, { which: 13, target: { value: 'new String' } }
      );
      expect(onChangeSpy).toHaveBeenCalledWith('new String');
    });
  });
});
