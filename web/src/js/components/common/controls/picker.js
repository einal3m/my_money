import React from 'react';
import ReactDOM from 'react-dom';
import { MenuItem, DropdownButton} from 'react-bootstrap';
require("../../../../css/picker.scss");

export default class Picker extends React.Component {

  onSelect(_event, key) {
    this.props.onChange(Number(key));
  }

  renderOptionName(option) {
    let selected = (this.props.value === option.id);
    let prefix = selected ? '\u2713' : '\u00A0\u00A0';
    return `${prefix} ${option.name}`;
  }

  renderOptions() {
    return this.props.options.map(option => {
      return (
        <MenuItem key={option.id} eventKey={option.id}>
          {this.renderOptionName(option)}
        </MenuItem>
      )
    });
  }

  renderTitle() {
    let title;
    if (this.props.value) {
      this.props.options.forEach(option => {
        if (this.props.value === option.id) {
          title = option.name;
        }
      });
    } else {
      title = 'Please select...';
    }

    return title;
  }

  render() {
    return (
      <div className='picker form-horizontal'>
        <DropdownButton title={this.renderTitle()} pullRight id='dropdown'
                        onSelect={this.onSelect.bind(this)}>
          {this.renderOptions()}
        </DropdownButton>
      </div>
    );
  }
}

Picker.propTypes = {
  value: React.PropTypes.number,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired
  })).isRequired,
  onChange: React.PropTypes.func.isRequired
};
