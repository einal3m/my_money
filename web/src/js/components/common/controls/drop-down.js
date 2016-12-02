import React, { PropTypes } from 'react';
import DropDownItem from './drop-down-item';

require('../../../../css/drop-down.scss');

export default class DropDown extends React.Component {

  constructor(props) {
    super();
    this.state = {
      open: false, id: props.value, name: this.nameForId(props.value, props.options, props.groupedOptions),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        id: nextProps.value, name: this.nameForId(nextProps.value, nextProps.options, nextProps.groupedOptions),
      });
    }
  }

  nameForId = (id, options, groupedOptions) => {
    if (id && options) {
      const match = options.filter(option => id === option.id);
      if (match.length >= 1) return match[0].name;
      return null;
    }
    if (id && groupedOptions) {
      let name = null;
      groupedOptions.forEach((group) => {
        group.options.forEach((option) => {
          if (id === option.id) name = option.name;
        });
      });
      return name;
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

  renderUnassignedOption = () => (
    <DropDownItem
      key="unassigned"
      label={'Un-assigned'}
      value={null}
      selected={this.state.id == null}
      onClick={this.onSelect}
    />
  );

  renderOptionGroup = optionGroup => (
    optionGroup.map(option =>
      <DropDownItem
        key={option.id}
        label={option.name}
        value={option.id}
        selected={this.state.id === option.id}
        onClick={this.onSelect}
      />
    )
  );

  renderGroupName = group => <div key={group.name} className="group">{group.name}</div>;

  renderGroups() {
    let rows = [];
    this.props.groupedOptions.forEach((group) => {
      rows.push(this.renderGroupName(group));
      rows = rows.concat(this.renderOptionGroup(group.options));
    });
    return rows;
  }

  renderOptions() {
    let options;
    if (this.props.options) {
      options = this.renderOptionGroup(this.props.options);
    }

    if (this.props.groupedOptions) {
      options = this.renderGroups();
    }

    if (this.props.allowUnassigned) {
      options.unshift(this.renderUnassignedOption());
    }
    return options;
  }

  render() {
    let className = 'form-control dropdown-wrapper';
    if (this.state.open) {
      className += ' open';
    }

    return (
      <div className={className} name={this.props.name}>
        <button className="btn btn-link btn-block" onClick={this.dropdown} onBlur={this.onBlur}>
          <span>{this.renderSelectedOption()}</span>
          <i className="fa fa-caret-down pull-right" />
        </button>
        <div className="dropdown">
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}

const optionsProp = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}));

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  options: optionsProp,
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: optionsProp,
  })),
  allowUnassigned: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
