import React, { PropTypes } from 'react';

const FormControl = props => (
  <div className={`form-group ${errorState(props.validator, props.name)}`}>
    <label className="control-label" htmlFor={props.name}>{props.label}</label>
    {props.children}
    {helpBlock(props.validator, props.name)}
  </div>
);

function errorState(validator, name) {
  return validator ? validator.errorState(name) : 'has-success';
}

function helpBlock(validator, name) {
  if (validator) return <div className="help-block">{validator.errorFor(name)}</div>;
  return <div />;
}

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validator: PropTypes.shape({
    errorState: PropTypes.func.isRequired,
    errorFor: PropTypes.func.isRequired,
  }),
  children: PropTypes.node,
};

export default FormControl;
