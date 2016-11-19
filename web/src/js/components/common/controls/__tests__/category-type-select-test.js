import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import CategoryTypeSelect from '../category-type-select';

describe('CategoryTypeSelect', () => {
  let select;
  let categoryTypes;
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
    categoryTypes = [
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
    ];
  });

  describe('render', () => {
    it('has a select with correct category type selected', () => {
      select = shallowRenderer(
        <CategoryTypeSelect value={2} categoryTypes={categoryTypes} onChange={onChangeSpy} />
      );

      expect(select.type).toEqual('select');
      expect(select.props.value).toEqual(2);

      const [blank, options] = select.props.children;
      expect(blank).toBeUndefined();
      expect(options.length).toEqual(2);
      expect(options[0].props.children).toEqual('One');
      expect(options[1].props.children).toEqual('Two');
    });

    it('has a select with a placeholder when value is missing', () => {
      select = shallowRenderer(<CategoryTypeSelect categoryTypes={categoryTypes} onChange={onChangeSpy} />);
      expect(select.type).toEqual('select');
      expect(select.props.value).toEqual('0');

      const [blank, options] = select.props.children;
      expect(blank.props.children).toEqual('Please select...');
      expect(options.length).toEqual(2);
      expect(options[0].props.children).toEqual('One');
      expect(options[1].props.children).toEqual('Two');
    });
  });

  describe('onChange', () => {
    it('calls the onChange prop', () => {
      select = shallowRenderer(
        <CategoryTypeSelect value={2} categoryTypes={categoryTypes} onChange={onChangeSpy} />
      );

      select.props.onChange({ target: { name: 'categoryTypeId', value: '2' } });

      expect(onChangeSpy).toHaveBeenCalledWith({ target: { name: 'categoryTypeId', value: 2 } });
    });
  });
});
