import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MoneyInput from '../money-input';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';

describe('MoneyInput', () => {
  const onChangeSpy = jasmine.createSpy('onChangeSpy');

  describe('render', () => {
    it('renders an input with $ add-on', () => {
      const moneyInput = shallowRenderer(<MoneyInput name="myInput" value={3456} onChange={onChangeSpy} />);

      const [addon, input] = moneyInput.props.children;

      expect(moneyInput.props.className).toEqual('input-group');
      expect(addon.props.className).toEqual('input-group-addon');
      expect(addon.props.children).toEqual('$');
      expect(input.type).toEqual('input');
      expect(input.props.name).toEqual('myInput');
      expect(input.props.defaultValue).toEqual(34.56);
    });
  });

  describe('events', () => {
    it('returns the actual value if it is not a number', () => {
      const moneyInput = TestUtils.renderIntoDocument(
        <MoneyInput name="myInput" value={5678} onChange={onChangeSpy} />
      );
      const input = moneyInput.input;

      input.value = 'hello';
      TestUtils.Simulate.blur(input);

      expect(onChangeSpy).toHaveBeenCalledWith({ target: { name: 'myInput', value: 'hello' } });
    });

    it('returns the value in cents', () => {
      const moneyInput = TestUtils.renderIntoDocument(
        <MoneyInput name="myInput" value={5678} onChange={onChangeSpy} />
      );
      const input = moneyInput.input;

      input.value = 34.56;
      TestUtils.Simulate.blur(input);

      expect(onChangeSpy).toHaveBeenCalledWith({ target: { name: 'myInput', value: 3456 } });
    });
  });
});
