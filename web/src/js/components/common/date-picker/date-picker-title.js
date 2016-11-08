import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import {
  DATE_PICKER_DAY_MODE,
  DATE_PICKER_MONTH_MODE,
  DATE_PICKER_YEAR_MODE } from './date-picker-constants';

export default class DatePickerTitle extends Component {

  previousPeriod = () => {
    switch (this.props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        this.props.handlePrevious(1, 'month');
        return;
      case DATE_PICKER_MONTH_MODE:
        this.props.handlePrevious(1, 'year');
        return;
      case DATE_PICKER_YEAR_MODE:
        this.props.handlePrevious(10, 'years');
        return;
      default:
        return;
    }
  };

  nextPeriod = () => {
    switch (this.props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        this.props.handleNext(1, 'month');
        return;
      case DATE_PICKER_MONTH_MODE:
        this.props.handleNext(1, 'year');
        return;
      case DATE_PICKER_YEAR_MODE:
        this.props.handleNext(10, 'years');
        return;
      default:
        return;
    }
  };

  setView = () => {
    switch (this.props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        this.props.setView(DATE_PICKER_MONTH_MODE);
        return;
      case DATE_PICKER_MONTH_MODE:
        this.props.setView(DATE_PICKER_YEAR_MODE);
        return;
      default:
        return;
    }
  };

  renderTitle = () => {
    switch (this.props.viewMode) {
      case DATE_PICKER_DAY_MODE:
        return `${this.props.viewDate.format('MMMM')} ${this.props.viewDate.format('YYYY')}`;
      case DATE_PICKER_MONTH_MODE:
        return `${this.props.viewDate.format('YYYY')}`;
      case DATE_PICKER_YEAR_MODE:
        return `${this.props.viewDate.format('YYYY')} - ${moment(this.props.viewDate).add(9, 'years').format('YYYY')}`;
      default:
        return '';
    }
  };

  titleClassName = () => {
    if (this.props.viewMode === DATE_PICKER_YEAR_MODE) return 'title no-hover';
    return 'title';
  };

  render() {
    return (
      <div className="popover-title">
        <i className="fa fa-chevron-left previous" aria-hidden="true" onClick={this.previousPeriod} />
        <span className={this.titleClassName()} onClick={this.setView}>{this.renderTitle()}</span>
        <i className="fa fa-chevron-right next" aria-hidden="true" onClick={this.nextPeriod} />
      </div>
    );
  }
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
