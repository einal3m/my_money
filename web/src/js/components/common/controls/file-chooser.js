import React, { PropTypes } from 'react';

export default class FileChooser extends React.Component {
  constructor() {
    super();
    this.state = { fileName: null };
  }

  onChooseFile = (event) => {
    const file = event.target.files[0];
    this.props.onChoose(file);
    this.setState({ fileName: file.name });
  };

  clearFile = () => {
    this.fileChooser.value = null;
    this.props.onChoose(null);
    this.setState({ fileName: null });
  };

  renderFileName() {
    if (this.state.fileName) {
      return (
        <span className="file-name-display">
          {this.state.fileName}
          <i className="fa fa-times-circle" onClick={this.clearFile} />
        </span>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div>
        <label htmlFor="fileChooser" className="btn btn-default"><i className="fa fa-folder-open-o" /></label>
        <input
          id="fileChooser"
          ref={(input) => { this.fileChooser = input; }}
          name="fileChooser"
          type="file"
          className="hidden"
          accept=".ofx,.csv"
          onChange={this.onChooseFile}
        />
        {this.renderFileName()}
      </div>
    );
  }
}

FileChooser.propTypes = {
  onChoose: PropTypes.func.isRequired,
};
