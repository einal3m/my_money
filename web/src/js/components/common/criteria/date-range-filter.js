import React from 'react';
import {connect} from 'react-redux';
import dateRangeActions from '../../../actions/date-range-actions';

import { Input, Button, Glyphicon } from 'react-bootstrap';
import DatePicker from '../date-picker/DateTimeField';
require("../../../../css/bootstrap-datetimepicker.scss");

export class DateRangeFilter extends React.Component {

  constructor() {
    super();
    dateRangeActions.getDateRanges();
  }

  onSelectDateRange(event) {
    dateRangeActions.setCurrentDateRange(Number(event.target.value));
    this.props.fetch();
  }

  onFromDateChange(date) {
    dateRangeActions.updateCurrentDateRange({fromDate: date});
    this.props.fetch();
  }

  onToDateChange(date) {
    dateRangeActions.updateCurrentDateRange({toDate: date});
    this.props.fetch();
  }

  renderDateRanges() {
    return this.props.dateRanges.map((dateRange) => {
      return <option key={dateRange.id} value={dateRange.id}>{dateRange.name}</option>;
    });
  }

  renderDateRangeFilter() {
    if (this.props.loaded) {
      return ([
        <div key='date-range-select' className="col-xs-4">
          <div className="form-horizontal">
            <Input type="select" label="Date Range" value={this.props.currentDateRange.id} labelClassName="col-xs-4" wrapperClassName="col-xs-8"
                   onChange={this.onSelectDateRange.bind(this)} ref='dateRangeSelect'>
              {this.renderDateRanges()}
            </Input>
          </div>
        </div>,
        <div key='from-date' className="col-xs-4">
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="from_date" className="col-sm-3 control-label">From</label>
              <div className="col-sm-9">
                <DatePicker name='fromDate' dateTime={this.props.currentDateRange.fromDate}
                  format='YYYY-MM-DD' inputFormat='DD-MMM-YYYY' showToday mode='date'
                  onChange={this.onFromDateChange.bind(this)}
                  disabled={!this.props.currentDateRange.custom} ref='fromDate' />
                <span className="help-block hidden"></span>
              </div>
            </div>
          </div>
        </div>,
        <div key='to-date' className="col-xs-4">
          <div className="form-horizontal">
            <div className="form-group">
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
        </div>
      ]);
    }
  }

  render() {
    return (
      <div className="row">
        {this.renderDateRangeFilter()}
      </div>
    );
  }
}

DateRangeFilter.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  dateRanges: React.PropTypes.array.isRequired,
  currentDateRange: React.PropTypes.object.isRequired,
  fetch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loaded: state.dateRangeStore.get('loaded'),
    dateRanges: state.dateRangeStore.get('dateRanges').toJS(),
    currentDateRange: state.dateRangeStore.get('currentDateRange').toJS()
  };
}

export default connect(mapStateToProps)(DateRangeFilter);
