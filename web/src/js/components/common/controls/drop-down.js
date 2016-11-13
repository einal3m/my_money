import React, { PropTypes } from 'react';
import DropDownItem from './drop-down-item';

require('../../../../css/drop-down.scss');

export default class DropDown extends React.Component {

  constructor(props) {
    super();
    this.state = { open: false, id: props.value, name: this.nameForId(props.value, props.options) };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ id: nextProps.value, name: this.nameForId(nextProps.value, nextProps.options) });
    }
  }

  nameForId = (id, options) => {
    if (id && options) {
      const match = options.filter(option => id === option.id);
      if (match.length >= 1) return match[0].name;
      return null;
    }
    return null;
  };

  onSelect = (id, name) => {
    this.setState({ open: false, id, name });
    this.props.onChange(id);
  };

  dropdown = () => {
    this.setState({ open: !this.state.open });
  };

  onBlur = () => {
    this.setState({ open: false });
  };

  renderSelectedOption() {
    if (this.state.name) return this.state.name;

    return this.props.allowUnassigned ? 'Un-assigned' : 'Please select...';
  }

  renderOptions() {
    if (this.props.options) {
      const options = this.props.options.map(option =>
        <DropDownItem
          key={option.id}
          label={option.name}
          value={option.id}
          selected={this.state.id === option.id}
          onClick={this.onSelect}
        />
      );

      if (this.props.allowUnassigned) {
        options.unshift(
          <DropDownItem
            key="unassigned"
            label={'Un-assigned'}
            value={null}
            selected={this.state.id == null}
            onClick={this.onSelect}
          />
        );
      }
      return options;
    }
    return <div />;
  }

  render() {
    let className = 'form-control dropdown-wrapper';
    if (this.state.open) {
      className += ' open';
    }

    return (
      <div className={className}>
        <button className="btn btn-link btn-block" onClick={this.dropdown} onBlur={this.onBlur}>
          <span>{this.renderSelectedOption()}</span>
          <i className="fa fa-caret-down pull-right" />
        </button>
        <ul className="dropdown">
          {this.renderOptions()}
        </ul>
      </div>
    );
  }
}

DropDown.propTypes = {
  value: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  allowUnassigned: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
