import React from 'react';
import ReactSelect from 'react-select-plus';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import Select from '../select';

describe('Select', () => {
  const options = [
    { id: 1, name: 'Honey' },
    { id: 2, name: 'Chocolate' },
    { id: 3, name: 'Cake' },
  ];
  let onChangeSpy;
  let select;

  describe('render', () => {
    beforeEach(() => {
      onChangeSpy = jasmine.createSpy('onChangeSpy');
    });

    it('renders a react select', () => {
      select = shallowRenderer(<Select name="dropDown" value={2} options={options} onChange={onChangeSpy} />);

      expect(select.type).toEqual(ReactSelect);
      expect(select.props.name).toEqual('dropDown');
      expect(select.props.value).toEqual(2);
      expect(select.props.clearable).toEqual(false);
      expect(select.props.placeholder).toEqual('Please select...');
    });

    it('renders a react select with converted options', () => {
      select = shallowRenderer(<Select name="dropDown" value={2} options={options} onChange={onChangeSpy} />);

      expect(select.props.options).toEqual([
        { value: 1, label: 'Honey' },
        { value: 2, label: 'Chocolate' },
        { value: 3, label: 'Cake' },
      ]);
    });

    it('renders a react select with converted grouped options', () => {
      const groupedOptions = [
        { name: 'Group One', options: [{ id: 1, name: 'Honey' }] },
        { name: 'Group Two', options: [{ id: 2, name: 'Chocolate' }, { id: 3, name: 'Cake' }] },
      ];

      select = shallowRenderer(
        <Select name="dropDown" value={2} groupedOptions={groupedOptions} onChange={onChangeSpy} />
      );

      expect(select.props.options).toEqual([
        { label: 'Group One', options: [{ value: 1, label: 'Honey' }] },
        { label: 'Group Two', options: [{ value: 2, label: 'Chocolate' }, { value: 3, label: 'Cake' }] },
      ]);
    });

    it('renders with un-assigned placeholder and not clearable if no value and allowUnassigned is true', () => {
      select = shallowRenderer(<Select name="dropDown" options={options} allowUnassigned onChange={onChangeSpy} />);

      expect(select.props.placeholder).toEqual('Un-assigned');
      expect(select.props.clearable).toEqual(true);
    });
  });

  describe('on select', () => {
    it('calls the onChange prop with selected option', () => {
      select = shallowRenderer(<Select name="dropDown" value={2} options={options} onChange={onChangeSpy} />);

      select.props.onChange({ value: 1, label: 'Honey' });

      expect(onChangeSpy).toHaveBeenCalledWith(1);
    });

    it('calls the onChange prop with null when select cleared', () => {
      select = shallowRenderer(<Select name="dropDown" value={2} options={options} onChange={onChangeSpy} />);

      select.props.onChange(null);

      expect(onChangeSpy).toHaveBeenCalledWith(null);
    });
  });
});
