import React from 'react';
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
    let input;
    beforeEach(() => {
      const descriptionFilter = shallowRenderer(<DescriptionFilter description={description} onChange={onChangeSpy} />);
      input = descriptionFilter.props.children.props.children.props.children[1];
    });

    it('when blur from input', () => {
      input.props.onBlur({ target: { value: 'new String' } });
      expect(onChangeSpy).toHaveBeenCalledWith('new String');
    });

    it('when enter key pressed', () => {
      input.props.onKeyPress({ which: 13, target: { value: 'new String' } });
      expect(onChangeSpy).toHaveBeenCalledWith('new String');
    });
  });
});
