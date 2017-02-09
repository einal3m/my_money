import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import Button from '../button';

describe('Button', () => {
  let onClickSpy;
  beforeEach(() => {
    onClickSpy = jasmine.createSpy('onClickSpy');
  });

  it('renders a button with child', () => {
    const button = shallowRenderer(<Button onClick={onClickSpy}>Child</Button>);
    expect(button.type).toEqual('button');
    expect(button.props.className).toMatch(/btn btn-default/);
    expect(button.props.children).toEqual('Child');
  });

  it('renders with a pull-left class if pullLeft is true', () => {
    const button = shallowRenderer(<Button type="delete" pullLeft onClick={onClickSpy}>Child</Button>);
    expect(button.props.className).toMatch(/pull-left/);
  });

  describe('button type', () => {
    it('converts "primary" to bootstrap "success"', () => {
      const button = shallowRenderer(<Button type="primary" onClick={onClickSpy}>Child</Button>);
      expect(button.props.className).toMatch(/btn-success/);
    });

    it('converts "secondary" to bootstrap "default"', () => {
      const button = shallowRenderer(<Button type="secondary" onClick={onClickSpy}>Child</Button>);
      expect(button.props.className).toMatch(/btn-default/);
    });

    it('converts "delete" to bootstrap "danger"', () => {
      const button = shallowRenderer(<Button type="delete" onClick={onClickSpy}>Child</Button>);
      expect(button.props.className).toMatch(/btn-danger/);
    });

    it('converts "link" to bootstrap "link"', () => {
      const button = shallowRenderer(<Button type="link" onClick={onClickSpy}>Child</Button>);
      expect(button.props.className).toMatch(/btn-link/);
    });
  });

  describe('events', () => {
    it('onClick calls the onClick prop', () => {
      const button = shallowRenderer(<Button type="link" onClick={onClickSpy}>Child</Button>);

      button.props.onClick();

      expect(onClickSpy).toHaveBeenCalled();
    });
  });
});
