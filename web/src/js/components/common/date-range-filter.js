'use strict';

import React from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-datetimepicker';
require("../../../css/bootstrap-datetimepicker.scss");

export default class DateRangeFilter extends React.Component {
  onSelectDateRange(event) {
    this.props.onChange({id: Number(event.target.value)});
  }

  onFromDateChange(date) {
    this.props.onChange({ fromDate: date });
  }

  onToDateChange(date) {
    this.props.onChange({ toDate: date });
  }

  renderDateRanges() {
    return this.props.dateRanges.map((dateRange) => {
      return <option key={dateRange.id} value={dateRange.id}>{dateRange.name}</option>;
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-4">
          <div className="form-horizontal">
            <Input type="select" label="Date Range" defaultValue={this.props.currentDateRange.id} labelClassName="col-xs-4" wrapperClassName="col-xs-8"
                onChange={this.onSelectDateRange.bind(this)} ref='dateRangeSelect'>
              {this.renderDateRanges()}
            </Input>
          </div>
        </div>
        <div className="col-xs-4">
          <label htmlFor="from_date" className="col-sm-3 control-label">From</label>
          <div className="col-sm-9">
            <DatePicker name='fromDate' dateTime={this.props.currentDateRange.fromDate}
              format='YYYY-MM-DD' inputFormat='DD-MMM-YYYY' showToday mode='date'
              onChange={this.onFromDateChange.bind(this)}
              disabled={!this.props.currentDateRange.custom} ref='fromDate' />
            <span className="help-block hidden"></span>
          </div>
        </div>
        <div className="col-xs-4">
          <label htmlFor="to_date" className="col-sm-3 control-label">To</label>
          <div className="col-sm-9">
            <DatePicker name='toDate' dateTime={this.props.currentDateRange.toDate}
              format='YYYY-MM-DD' inputFormat='DD-MMM-YYYY' showToday 
              onChange={this.onToDateChange.bind(this)}
              disabled={!this.props.currentDateRange.custom} ref='toDate' />
            <span className="help-block hidden"></span>
          </div>
        </div>
      </div>
    );
  }
}

let dateRangeProps = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  custom: React.PropTypes.bool.isRequired,
  fromDate: React.PropTypes.string.isRequired,
  toDate: React.PropTypes.string.isRequired
});

DateRangeFilter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  currentDateRange: dateRangeProps.isRequired,
  dateRanges: React.PropTypes.arrayOf(dateRangeProps).isRequired
};

