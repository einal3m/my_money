import React from 'react';
import { render } from '@testing-library/react';
import selectEvent from 'react-select-event';
import Select from 'components/common/controls/Select';

describe('Select', () => {
  const onChangeSpy = jasmine.createSpy('onChangeSpy');

  describe('simple options', () => {
    const options = [
      { id: 1, name: 'Honey' },
      { id: 2, name: 'Chocolate' },
      { id: 3, name: 'Cake' },
    ];

    it('displays a placeholder if value is not defined', () => {
      const {getByText} = render(
        <Select
          name="dropDown"
          options={options}
          onChange={onChangeSpy}
          allowUnassigned
        />
      );

      expect(getByText('Un-assigned')).toBeInTheDocument();
    });

    it('displays a different placeholder if value is mandatory', () => {
      const {getByText} = render(
        <Select
          name="dropDown"
          options={options}
          onChange={onChangeSpy}
        />
      );

      expect(getByText('Please select...')).toBeInTheDocument();
    });

    it('displays the selected value if one is provided', () => {
      const {getByText, queryByText} = render(
        <Select
          name="dropDown"
          value={2}
          options={options}
          onChange={onChangeSpy}
        />
      );

      expect(getByText('Chocolate')).toBeInTheDocument();
      expect(queryByText('Honey')).not.toBeInTheDocument();
      expect(queryByText('Cake')).not.toBeInTheDocument();
    });

    it('displays the placeholder if value is not in the options', () => {
      const {getByText, queryByText} = render(
        <Select
          name="dropDown"
          value={12}
          options={options}
          onChange={onChangeSpy}
        />
      );

      expect(getByText('Please select...')).toBeInTheDocument();
      expect(queryByText('Chocolate')).not.toBeInTheDocument();
      expect(queryByText('Honey')).not.toBeInTheDocument();
      expect(queryByText('Cake')).not.toBeInTheDocument();
    });

    it('displays the list of options when clicked', async () => {
      const {getByText, container } = render(
        <Select
          name="dropDown"
          value={2}
          options={options}
          onChange={onChangeSpy}
        />
      );

      const dropdown = getByText('Chocolate')
      await selectEvent.openMenu(dropdown);

      const selectOptions = container.querySelectorAll(".react-select__option");

      expect(selectOptions.length).toEqual(3);
      expect(selectOptions[0].textContent).toEqual('Honey');
      expect(selectOptions[1].textContent).toEqual('Chocolate');
      expect(selectOptions[2].textContent).toEqual('Cake');
    });

    it('calls the onChange prop when an option is selected', async () => {
      const { getByText } = render(
        <Select
          name="dropDown"
          value={2}
          options={options}
          onChange={onChangeSpy}
        />
      );

      const dropdown = getByText('Chocolate')
      await selectEvent.select(dropdown, ['Honey']);

      expect(onChangeSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('grouped options', () => {
    const groupedOptions = [
      { name: 'Group One', options: [{ id: 1, name: 'Honey' }] },
      { name: 'Group Two', options: [{ id: 2, name: 'Chocolate' }, { id: 3, name: 'Cake' }] },
    ];

    it('displays the selected value if one is provided', () => {
      const {getByText, queryByText} = render(
        <Select
          name="dropDown"
          value={2}
          groupedOptions={groupedOptions}
          onChange={onChangeSpy}
        />
      );

      expect(getByText('Chocolate')).toBeInTheDocument();
      expect(queryByText('Honey')).not.toBeInTheDocument();
      expect(queryByText('Cake')).not.toBeInTheDocument();
    });

    it('displays the placeholder if value is not in the options', () => {
      const {getByText, queryByText} = render(
        <Select
          name="dropDown"
          value={12}
          groupedOptions={groupedOptions}
          onChange={onChangeSpy}
        />
      );

      expect(getByText('Please select...')).toBeInTheDocument();
      expect(queryByText('Chocolate')).not.toBeInTheDocument();
      expect(queryByText('Honey')).not.toBeInTheDocument();
      expect(queryByText('Cake')).not.toBeInTheDocument();
    });

    it('renders grouped options when clicked', async () => {

      const { getByText, container } = render(
        <Select
          name="dropDown"
          value={2}
          groupedOptions={groupedOptions}
          onChange={onChangeSpy}
        />
      );

      const dropdown = getByText('Chocolate');
      await selectEvent.openMenu(dropdown);

      const selectGroups = container.querySelectorAll(".react-select__group");

      expect(selectGroups.length).toEqual(2);
      expect(selectGroups[0].textContent).toEqual('Group OneHoney');
      expect(selectGroups[1].textContent).toEqual('Group TwoChocolateCake');
    });
  });
});
