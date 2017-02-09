import React, { PropTypes } from 'react';

const buttonTypeMapper = {
  secondary: 'default',
  primary: 'success',
  link: 'link',
  delete: 'danger',
};

const Button = props => (
  <button
    onClick={props.onClick}
    className={`btn btn-${buttonTypeMapper[props.type]} ${props.pullLeft ? 'pull-left' : ''}`}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(['secondary', 'primary', 'link', 'delete']).isRequired,
  children: PropTypes.node.isRequired,
  pullLeft: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'secondary',
};

export default Button;
