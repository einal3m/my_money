import React, { PropTypes } from 'react';

export default class DropDownItem extends React.Component {
  renderOptionName = () => {
    const prefix = this.props.selected ? '\u2713' : '\u00A0\u00A0';
    return `${prefix} ${this.props.label}`;
  };

  onClickHandler = () => {
    this.props.onClick(this.props.value, this.props.label);
  };

  onMouseDownHandler = (event) => {
    event.preventDefault();
  };

  render() {
    const className = this.props.selected ? 'selected' : '';

    return (
      <li className={className} onClick={this.onClickHandler} onMouseDown={this.onMouseDownHandler}>
        {this.renderOptionName()}
      </li>
    );
  }
}

DropDownItem.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
