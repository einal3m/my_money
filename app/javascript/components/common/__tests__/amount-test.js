import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import Amount from '../amount';

describe('Amount', () => {
  describe('render', () => {
    it('with positive amount', () => {
      const amount = shallowRenderer(<Amount amount={670707} />);

      const [sign, space, dollars, dot, cents] = amount.props.children;
      expect(sign.props.children).toEqual('+');
      expect(space).toEqual(' ');
      expect(dollars.props.children).toEqual('6,707');
      expect(dot).toEqual('.');
      expect(cents.props.children).toEqual('07');
    });

    it('with negative amount', () => {
      const amount = shallowRenderer(<Amount amount={-670707} />);

      const [sign, space, dollars, dot, cents] = amount.props.children;
      expect(sign.props.children).toEqual('-');
      expect(space).toEqual(' ');
      expect(dollars.props.children).toEqual('6,707');
      expect(dot).toEqual('.');
      expect(cents.props.children).toEqual('07');
    });

    it('with zero amount', () => {
      const amount = shallowRenderer(<Amount amount={0} />);

      const [sign, space, dollars, dot, cents] = amount.props.children;
      expect(sign).toBeUndefined();
      expect(space).toEqual(' ');
      expect(dollars.props.children).toEqual('0');
      expect(dot).toEqual('.');
      expect(cents.props.children).toEqual('00');
    });
  });
});
