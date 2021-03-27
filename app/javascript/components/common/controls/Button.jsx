import React from 'react';
import PropTypes from 'prop-types';

const buttonTypeMapper = {
  secondary: 'default',
  primary: 'success',
  link: 'link',
  delete: 'danger',
};

export default class Button extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={`btn btn-${buttonTypeMapper[this.props.type]} ${this.props.pullLeft ? 'pull-left' : ''}`}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['secondary', 'primary', 'link', 'delete']).isRequired,
  children: PropTypes.node.isRequired,
  pullLeft: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'secondary',
};
