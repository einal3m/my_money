import React from 'react';
import PropTypes from 'prop-types';
import DatePickertitle from './DatePickerTitle';
import DatePickerDayView from './DatePickerDayView';
import DatePickerMonthView from './DatePickerMonthView';
import DatePickerYearView from './DatePickerYearView';
import {
  DATE_PICKER_DAY_MODE,
  DATE_PICKER_MONTH_MODE,
  DATE_PICKER_YEAR_MODE } from './DatePickerConstants';

export default function DatePickerPopover(props) {

  const renderView = () => {
    switch (props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        return <DatePickerDayView {...props} />;
      case DATE_PICKER_MONTH_MODE:
        return <DatePickerMonthView {...props} />;
      case DATE_PICKER_YEAR_MODE:
        return <DatePickerYearView {...props} />;
      default:
        return <div />;
    }
  }

  return (
    <div>
      <DatePickertitle {...props} />
      {renderView()}
    </div>
  );
}

DatePickerPopover.propTypes = {
  viewMode: PropTypes.oneOf([DATE_PICKER_DAY_MODE, DATE_PICKER_MONTH_MODE, DATE_PICKER_YEAR_MODE]),
};
