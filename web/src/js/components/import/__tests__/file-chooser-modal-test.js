import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import FileChooserModal from '../file-chooser-modal';

describe('FileChooserModal', () => {
  let account,
    onImportSpy,
    onHideSpy,
    file;
  beforeEach(() => {
    account = { name: 'Melanie' };
    file = { name: 'myFile.ofx' };
    onImportSpy = jasmine.createSpy('onImportSpy');
    onHideSpy = jasmine.createSpy('onHideSpy');
  });

  describe('render', () => {
    it('has a title, file chooser and buttons', () => {
      const spy = jasmine.createSpy('spy');
      const modal = shallowRenderer(
        <FileChooserModal show account={{ name: 'Melanie' }} onHide={spy} onImport={spy} />
      );

      const [header, body, footer] = modal.props.children;
      const [cancelButton, importButton] = footer.props.children;

      expect(header.props.children.props.children).toEqual('Import Transactions');
      expect(cancelButton.props.children).toEqual('Cancel');
      expect(importButton.props.children).toEqual('Import');
    });
  });

  describe('events', () => {
    let modal;
    beforeEach(() => {
      modal = TestUtils.renderIntoDocument(
        <FileChooserModal show account={account} onHide={onHideSpy} onImport={onImportSpy} />
      );
    });

    describe('select file', () => {
      it('updates the state', () => {
        expect(modal.state).toEqual({ file: null });

        const fileInput = ReactDOM.findDOMNode(modal.refs.fileChooser);
        TestUtils.Simulate.change(fileInput, { target: { files: ['myFile'] } });
        expect(modal.state).toEqual({ file: 'myFile' });
      });
    });

    describe('clear file', () => {
      it('resets the selected file', () => {
        expect(modal.refs.clearFile).not.toBeDefined();

        modal.setState({ file });
        expect(modal.refs.clearFile).toBeDefined();

        const clearFile = ReactDOM.findDOMNode(modal.refs.clearFile);
        TestUtils.Simulate.click(clearFile);
        expect(modal.state).toEqual({ file: null });
      });
    });

    describe('onImport', () => {
      it('is disabled when state is empty', () => {
        expect(modal.refs.importButton.props.disabled).toEqual(true);
      });

      it('calls the onImport prop with the selected file', () => {
        modal.setState({ file });
        expect(modal.refs.importButton.props.disabled).toEqual(false);

        const importButton = ReactDOM.findDOMNode(modal.refs.importButton);
        TestUtils.Simulate.click(importButton);
        expect(onImportSpy).toHaveBeenCalledWith(file);
      });
    });

    describe('onHide', () => {
      it('calls the onHide prop when cancel button clicked', () => {
        const cancelButton = ReactDOM.findDOMNode(modal.refs.cancelButton);
        TestUtils.Simulate.click(cancelButton);

        expect(onHideSpy).toHaveBeenCalled();
      });
    });
  });
});
