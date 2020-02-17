import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FileChooser from '../common/controls/file-chooser';
import HorizontalFormControl from '../common/controls/horizontal-form-control';

export default class FileChooserModal extends React.Component {
  constructor() {
    super();
    this.state = { file: null };
  }

  onImport = () => {
    this.props.onImport(this.state.file);
  };

  onChooseFile = (file) => {
    this.setState({ file });
  };

  renderImportButton() {
    return (
      <Button
        className="btn btn-success"
        disabled={!this.state.file}
        onClick={this.onImport}
        ref={(b) => { this.importButton = b; }}
      >
        Import
      </Button>
    );
  }

  renderCancelButton() {
    return (
      <Button className="btn btn-default" onClick={this.props.onHide} ref={(b) => { this.cancelButton = b; }}>
        Cancel
      </Button>
    );
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>Import Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please select a file to import transactions into the &apos;
            <strong>{this.props.account.name}</strong>
            &apos; Account.  The file must be in OFX format
          </p>
          <HorizontalFormControl name="fileChooser" label="Choose File:" labelCol="3" controlCol="6">
            <FileChooser ref={(el) => { this.fileChooser = el; }} onChoose={this.onChooseFile} />
          </HorizontalFormControl>
        </Modal.Body>
        <Modal.Footer>
          {this.renderCancelButton()}
          {this.renderImportButton()}
        </Modal.Footer>
      </Modal>
    );
  }
}

FileChooserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};
