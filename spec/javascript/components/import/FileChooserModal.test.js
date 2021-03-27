import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import FileChooserModal from '../file-chooser-modal';
import FileChooser from '../../common/controls/file-chooser';
import HorizontalFormControl from '../../common/controls/horizontal-form-control';

describe('FileChooserModal', () => {
  const account = { name: 'My Account' };
  const file = { name: 'myFile.ofx' };
  let onImportSpy;
  let onHideSpy;

  beforeEach(() => {
    onImportSpy = jasmine.createSpy('onImportSpy');
    onHideSpy = jasmine.createSpy('onHideSpy');
  });

  describe('render', () => {
    it('has a title, file chooser and buttons', () => {
      const spy = jasmine.createSpy('spy');
      const modal = shallowRenderer(
        <FileChooserModal show account={account} onHide={spy} onImport={spy} />
      );

      const [header, body, footer] = modal.props.children;
      expect(header.props.children.props.children).toEqual('Import Transactions');

      const [info, formControl] = body.props.children;
      expect(info.props.children[0]).toMatch(/Please select/);
      expect(info.props.children[1].props.children).toEqual('My Account');

      expect(formControl.type).toEqual(HorizontalFormControl);
      expect(formControl.props.label).toEqual('Choose File:');
      expect(formControl.props.children.type).toEqual(FileChooser);

      const [cancelButton, importButton] = footer.props.children;
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

        modal.fileChooser.props.onChoose('myFile');
        expect(modal.state).toEqual({ file: 'myFile' });
      });
    });

    describe('onImport', () => {
      it('is disabled when state is empty', () => {
        expect(modal.importButton.props.disabled).toEqual(true);
      });

      it('calls the onImport prop with the selected file', () => {
        modal.setState({ file });
        expect(modal.importButton.props.disabled).toEqual(false);

        modal.importButton.props.onClick();
        expect(onImportSpy).toHaveBeenCalledWith(file);
      });
    });

    describe('onHide', () => {
      it('calls the onHide prop when cancel button clicked', () => {
        modal.cancelButton.props.onClick();

        expect(onHideSpy).toHaveBeenCalled();
      });
    });
  });
});
