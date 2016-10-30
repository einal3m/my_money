import React, { PropTypes } from 'react';

const FormControl = props => (
  <div className={`form-group ${props.validator.errorState(props.name)}`}>
    <label className="control-label" htmlFor={props.name}>{props.label}</label>
    {props.children}
    <div className="help-block">{props.validator.errorFor(props.name)}</div>
  </div>
);

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validator: PropTypes.shape({
    errorState: PropTypes.func.isRequired,
    errorFor: PropTypes.func.isRequired,
  }).isRequired,
};

export default FormControl;
