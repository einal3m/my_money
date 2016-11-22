import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import FileChooser from '../file-chooser';

describe('FileChooser', () => {
  const file = { name: 'myFile.ofx' };
  let onChooseSpy;

  beforeEach(() => {
    onChooseSpy = jasmine.createSpy('onChooseSpy');
  });

  describe('render', () => {
    it('has a button and no file name by default', () => {
      const fileChooser = shallowRenderer(<FileChooser onChoose={onChooseSpy} />);

      const [label, input, fileName] = fileChooser.props.children;

      expect(label.props.children.props.className).toMatch(/folder-open/);
      expect(input.type).toEqual('input');
      expect(input.props.className).toEqual('hidden');
      expect(fileName).toBeUndefined();
    });
  });

  describe('events', () => {
    describe('select file', () => {
      it('calls the onChoose callback and shows the file name', () => {
        const fileChooser = TestUtils.renderIntoDocument(<FileChooser onChoose={onChooseSpy} />);
        expect(fileChooser.state).toEqual({ fileName: null });
        expect(TestUtils.scryRenderedDOMComponentsWithClass(fileChooser, 'file-name-display').length).toEqual(0);

        TestUtils.Simulate.change(fileChooser.fileChooser, { target: { files: [file] } });
        expect(fileChooser.state).toEqual({ fileName: 'myFile.ofx' });
        expect(onChooseSpy).toHaveBeenCalledWith(file);

        const fileName = TestUtils.scryRenderedDOMComponentsWithClass(fileChooser, 'file-name-display')[0];
        expect(fileName.textContent).toEqual('myFile.ofx');
      });
    });

    describe('clear file', () => {
      it('calls the onChoose callback and hides the file name', () => {
        const fileChooser = TestUtils.renderIntoDocument(<FileChooser onChoose={onChooseSpy} />);
        fileChooser.setState({ fileName: 'myFile.ofx' });

        const fileName = TestUtils.findRenderedDOMComponentWithClass(fileChooser, 'file-name-display');
        expect(fileName.textContent).toEqual('myFile.ofx');

        const clearFile = TestUtils.findRenderedDOMComponentWithClass(fileChooser, 'fa-times-circle');
        TestUtils.Simulate.click(clearFile);

        expect(onChooseSpy).toHaveBeenCalledWith(null);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(fileChooser, 'file-name-display').length).toEqual(0);
      });
    });
  });
});
