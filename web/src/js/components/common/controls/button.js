import React, { PropTypes } from 'react';

const Button = props => (
  <button className={`btn btn-${props.type}`}>
    {props.children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(['secondary', 'primary', 'link', 'danger']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
