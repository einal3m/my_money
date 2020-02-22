import React, { PropTypes } from 'react';

const HorizontalFormControl = props => (
  <div className="form-horizontal">
    <div className="form-group">
      <label htmlFor={props.name} className={`col-xs-${props.labelCol} control-label`}>{props.label}</label>
      <div className={`col-xs-${props.controlCol}`}>
        {props.children}
      </div>
    </div>
  </div>
);

HorizontalFormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelCol: PropTypes.string.isRequired,
  controlCol: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HorizontalFormControl;
