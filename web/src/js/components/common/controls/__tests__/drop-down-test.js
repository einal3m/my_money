import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import DropDown from '../drop-down';
import DropDownItem from '../drop-down-item';

describe('DropDown', () => {
  const options = [
    { id: 1, name: 'Honey' },
    { id: 2, name: 'Chocolate' },
    { id: 3, name: 'Cake' },
  ];
  let onChangeSpy;
  let dropdown;

  describe('render', () => {
    beforeEach(() => {
      onChangeSpy = jasmine.createSpy('onChangeSpy');
    });

    it('is a closed dropdown by default', () => {
      dropdown = shallowRenderer(<DropDown value={2} options={options} onChange={onChangeSpy} />);
      expect(dropdown.props.className).not.toMatch(/open/);
    });

    it('renders "please select" if no value is provided and allowUnassigned is false', () => {
      dropdown = shallowRenderer(<DropDown options={options} onChange={onChangeSpy} />);

      const button = dropdown.props.children[0];
      expect(button.props.children[0].props.children).toEqual('Please select...');
    });

    it('renders "Un-assigned" option if no value is provided and allowUnassigned is true', () => {
      dropdown = shallowRenderer(<DropDown options={options} allowUnassigned onChange={onChangeSpy} />);

      const [button, list] = dropdown.props.children;
      expect(button.props.children[0].props.children).toEqual('Un-assigned');

      const unassignedOption = list.props.children[0];
      expect(list.props.children.length).toEqual(4);
      expect(unassignedOption.props.value).toEqual(null);
      expect(unassignedOption.props.label).toEqual('Un-assigned');
      expect(unassignedOption.props.selected).toBeTruthy();
    });

    describe('basic dropdown', () => {
      it('renders a button with selected value, and a list of options', () => {
        dropdown = shallowRenderer(<DropDown value={2} options={options} onChange={onChangeSpy} />);
        const [button, list] = dropdown.props.children;
        expect(button.props.children[0].props.children).toEqual('Chocolate');

        const [option1, option2, option3] = list.props.children;
        expect(option1.type).toEqual(DropDownItem);
        expect(option1.props.value).toEqual(1);
        expect(option1.props.label).toEqual('Honey');
        expect(option1.props.selected).toEqual(false);
        expect(option2.type).toEqual(DropDownItem);
        expect(option2.props.value).toEqual(2);
        expect(option2.props.label).toEqual('Chocolate');
        expect(option2.props.selected).toEqual(true);
        expect(option3.type).toEqual(DropDownItem);
        expect(option3.props.value).toEqual(3);
        expect(option3.props.label).toEqual('Cake');
        expect(option3.props.selected).toEqual(false);
      });
    });

    describe('grouped dropdown', () => {
      it('renders a button with selected value, and a grouped list of options', () => {
        const groupedOptions = [
          { name: 'Group One', options: [{ id: 1, name: 'Honey' }] },
          { name: 'Group Two', options: [{ id: 2, name: 'Chocolate' }, { id: 3, name: 'Cake' }] },
        ];
        dropdown = shallowRenderer(<DropDown value={2} groupedOptions={groupedOptions} onChange={onChangeSpy} />);
        const [button, list] = dropdown.props.children;
        expect(button.props.children[0].props.children).toEqual('Chocolate');

        const [group1, option1, group2, option2, option3] = list.props.children;
        expect(group1.type).toEqual('li');
        expect(group1.props.children).toEqual('Group One');
        expect(option1.type).toEqual(DropDownItem);
        expect(option1.props.value).toEqual(1);
        expect(option1.props.label).toEqual('Honey');
        expect(option1.props.selected).toEqual(false);
        expect(group2.type).toEqual('li');
        expect(group2.props.children).toEqual('Group Two');
        expect(option2.type).toEqual(DropDownItem);
        expect(option2.props.value).toEqual(2);
        expect(option2.props.label).toEqual('Chocolate');
        expect(option2.props.selected).toEqual(true);
        expect(option3.type).toEqual(DropDownItem);
        expect(option3.props.value).toEqual(3);
        expect(option3.props.label).toEqual('Cake');
        expect(option3.props.selected).toEqual(false);
      });
    });
  });

  describe('events', () => {
    it('click on button opens drop down list', () => {
      dropdown = TestUtils.renderIntoDocument(<DropDown value={2} options={options} onChange={onChangeSpy} />);
      spyOn(dropdown, 'setState');

      const button = TestUtils.findRenderedDOMComponentWithTag(dropdown, 'button');

      TestUtils.Simulate.click(button);

      expect(dropdown.setState).toHaveBeenCalledWith({ open: true });
    });

    it('calls onChange prop when option clicked', () => {
      dropdown = TestUtils.renderIntoDocument(<DropDown value={2} options={options} onChange={onChangeSpy} />);
      const option3 = TestUtils.scryRenderedDOMComponentsWithTag(dropdown, 'li')[2];

      TestUtils.Simulate.click(option3);

      expect(onChangeSpy).toHaveBeenCalledWith(3);
    });
  });
});
