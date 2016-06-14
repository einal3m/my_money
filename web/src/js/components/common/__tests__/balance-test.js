import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import Balance from '../balance';

describe('Balance', () => {
  describe('render', () => {
    it('with positive amount', () => {
      let balance = shallowRenderer(<Balance balance={670707} />);

      let [dollars, dot, cents, bracket] = balance.props.children;
      expect(dollars.props.children).toEqual('$6,707');
      expect(dot).toEqual('.');
      expect(cents.props.children).toEqual('07');
      expect(bracket).toBeUndefined();
    });

    it('with negative amount', () => {
      let balance = shallowRenderer(<Balance balance={-670707} />);

      let [dollars, dot, cents, bracket] = balance.props.children;
      expect(dollars.props.children).toEqual('$(6,707');
      expect(dot).toEqual('.');
      expect(cents.props.children).toEqual('07');
      expect(bracket.props.children).toEqual(')')
    });

    it('with zero amount', () => {
      let balance = shallowRenderer(<Balance balance={0} />);

      let [dollars, dot, cents, bracket] = balance.props.children;
      expect(dollars.props.children).toEqual('$0');
      expect(dot).toEqual('.');
      expect(cents.props.children).toEqual('00');
      expect(bracket).toBeUndefined();
    });
  });
});
