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

export default class DatePickerPopover extends React.Component {

  renderView() {
    switch (this.props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        return <DatePickerDayView {...this.props} />;
      case DATE_PICKER_MONTH_MODE:
        return <DatePickerMonthView {...this.props} />;
      case DATE_PICKER_YEAR_MODE:
        return <DatePickerYearView {...this.props} />;
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div>
        <DatePickertitle {...this.props} />
        {this.renderView()}
      </div>
    );
  }
}

DatePickerPopover.propTypes = {
  viewMode: PropTypes.oneOf([DATE_PICKER_DAY_MODE, DATE_PICKER_MONTH_MODE, DATE_PICKER_YEAR_MODE]),
};
