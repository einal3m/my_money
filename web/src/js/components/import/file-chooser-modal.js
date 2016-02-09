import React from 'react';
import { FormControls, Modal, Button } from 'react-bootstrap';

export default class FileChooserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    }
  }

  onImport() {
    this.props.onImport(this.state.file);
  }

  onChooseFile(event) {
    this.setState({file: event.target.files[0]});
  }

  clearFile() {
    this.refs.fileChooser.value = null;
    this.setState({file: null});
  }

  renderFileName() {
    if (this.state.file) {
      return (
        <span className='file-name-display'>
          {this.state.file.name}
          <i ref='clearFile' className='blah fa fa-times-circle' onClick={this.clearFile.bind(this)}/>
        </span>
      );
    }
  }

  renderImportButton()  {
    let buttonProps = {
      className: 'btn btn-success',
      ref: 'importButton',
      onClick: this.onImport.bind(this),
      disabled: !this.state.file
    }
    return <Button {...buttonProps}>Import</Button>
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>Import Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select a file to import transactions into the '<strong>{this.props.account.name}</strong>' 
          Account.  The file must be in OFX format</p>
          <form className="form-horizontal">
            <label>Choose File:</label>&nbsp;
            <label htmlFor='fileChooser' className='btn btn-default'><i className="fa fa-folder-open-o" /></label>
            <input ref='fileChooser' id='fileChooser' type='file' className='hidden' accept='.ofx' onChange={this.onChooseFile.bind(this)}/>
            {this.renderFileName()}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-default' ref='cancelButton' onClick={this.props.onHide}>Cancel</Button>
          {this.renderImportButton()}
        </Modal.Footer>
      </Modal>
    );
  }
}


FileChooserModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  account: React.PropTypes.object.isRequired,
  onHide: React.PropTypes.func.isRequired,
  onImport: React.PropTypes.func.isRequired
};
