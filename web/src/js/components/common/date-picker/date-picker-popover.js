import React, { PropTypes, Component } from 'react';
import DatePickertitle from './date-picker-title';
import DatePickerDayView from './date-picker-day-view';
import DatePickerMonthView from './date-picker-month-view';
import DatePickerYearView from './date-picker-year-view';
import {
  DATE_PICKER_DAY_MODE,
  DATE_PICKER_MONTH_MODE,
  DATE_PICKER_YEAR_MODE } from './date-picker-constants';

export default class DatePickerPopover extends Component {

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
