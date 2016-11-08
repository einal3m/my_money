import React, { PropTypes } from 'react';

const DatePickerPanel = (props) => {
  const onClickHandler = () => {
    props.onClick(props.value);
  };

  let classNames = 'btn btn-link';
  if (props.muted) classNames += ' text-muted';

  return (
    <button className={classNames} onClick={onClickHandler}>
      {props.label}
    </button>
  );
};

DatePickerPanel.propTypes = {
  value: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DatePickerPanel;
