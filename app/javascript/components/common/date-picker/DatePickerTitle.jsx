import React from 'react';
import PropTypes from 'prop-types';
import {
  DATE_PICKER_DAY_MODE,
  DATE_PICKER_MONTH_MODE,
  DATE_PICKER_YEAR_MODE } from './DatePickerConstants';

export default function DatePickerTitle(props) {

  const previousPeriod = () => {
    switch (props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        props.handlePrevious(1, 'month');
        return;
      case DATE_PICKER_MONTH_MODE:
        props.handlePrevious(1, 'year');
        return;
      case DATE_PICKER_YEAR_MODE:
        props.handlePrevious(10, 'years');
        return;
      default:
        return;
    }
  }

  const nextPeriod = () => {
    switch (props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        props.handleNext(1, 'month');
        return;
      case DATE_PICKER_MONTH_MODE:
        props.handleNext(1, 'year');
        return;
      case DATE_PICKER_YEAR_MODE:
        props.handleNext(10, 'years');
        return;
      default:
        return;
    }
  };

  const setView = () => {
    switch (props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        props.setView(DATE_PICKER_MONTH_MODE);
        return;
      case DATE_PICKER_MONTH_MODE:
        props.setView(DATE_PICKER_YEAR_MODE);
        return;
      default:
        return;
    }
  };

  const startOfDecade = () => {
    return (props.viewDate.year() - (props.viewDate.year() % 10));
  }

  const renderTitle = () => {
    switch (props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        return `${props.viewDate.format('MMMM')} ${props.viewDate.format('YYYY')}`;
      case DATE_PICKER_MONTH_MODE:
        return `${props.viewDate.format('YYYY')}`;
      case DATE_PICKER_YEAR_MODE:
        const year = startOfDecade();
        return `${year} - ${year + 9}`;
      default:
        return '';
    }
  };

  return (
    <div className="popover-title">
      <button className="btn btn-link previous" onClick={previousPeriod}>
        <i className="fa fa-chevron-left" data-testid="date-picker-left" aria-hidden="true" />
      </button>
      <button
        className="btn btn-link title"
        onClick={setView}
        disabled={props.viewMode === DATE_PICKER_YEAR_MODE}
      >
        {renderTitle()}
      </button>
      <button className="btn btn-link next" onClick={nextPeriod}>
        <i className="fa fa-chevron-right"  data-testid="date-picker-right" aria-hidden="true" />
      </button>
    </div>
  );
}

DatePickerTitle.propTypes = {
  viewDate: PropTypes.shape({
    format: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }).isRequired,
  viewMode: PropTypes.oneOf([DATE_PICKER_DAY_MODE, DATE_PICKER_MONTH_MODE, DATE_PICKER_YEAR_MODE]).isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};
