import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentDateRange, updateCurrentDateRange } from '../../../actions/date-range-actions';
import DatePicker from '../date-picker/date-picker';
import Select from '../../common/controls/select';

export class DateRangeFilterComponent extends React.Component {

  onSelectDateRange = (id) => {
    setCurrentDateRange(id);
    this.props.fetch();
  };

  onFromDateChange = (date) => {
    updateCurrentDateRange({ fromDate: date });
    this.props.fetch();
  };

  onToDateChange = (date) => {
    updateCurrentDateRange({ toDate: date });
    this.props.fetch();
  };

  renderDateRangeFilter() {
    if (this.props.loaded) {
      return ([
        <div key="date-range-select" className="col-xs-4">
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="dateRangeSelect" className="col-xs-4 control-label">Date Range</label>
              <div className="col-xs-8">
                <Select
                  name="dateRangeId"
                  value={this.props.currentDateRange.id}
                  options={this.props.dateRanges}
                  onChange={this.onSelectDateRange}
                />
              </div>
            </div>
          </div>
        </div>,
        <div key="from-date" className="col-xs-4">
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="fromDate" className="col-sm-3 control-label">From</label>
              <div className="col-sm-9">
                <DatePicker
                  name="fromDate"
                  value={this.props.currentDateRange.fromDate}
                  onChange={this.onFromDateChange}
                  disabled={!this.props.currentDateRange.custom}
                />
                <span className="help-block hidden" />
              </div>
            </div>
          </div>
        </div>,
        <div key="to-date" className="col-xs-4">
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="toDate" className="col-sm-3 control-label">To</label>
              <div className="col-sm-9">
                <DatePicker
                  name="toDate"
                  value={this.props.currentDateRange.toDate}
                  onChange={this.onToDateChange}
                  disabled={!this.props.currentDateRange.custom}
                />
                <span className="help-block hidden" />
              </div>
            </div>
          </div>
        </div>,
      ]);
    }
    return <div />;
  }

  render() {
    return (
      <div className="row">
        {this.renderDateRangeFilter()}
      </div>
    );
  }
}

DateRangeFilterComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  dateRanges: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentDateRange: PropTypes.shape({
    id: PropTypes.number,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
    custom: PropTypes.bool,
  }).isRequired,
  fetch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: state.dateRangeStore.get('loaded'),
    dateRanges: state.dateRangeStore.get('dateRanges').toJS(),
    currentDateRange: state.dateRangeStore.get('currentDateRange').toJS(),
  };
}

export default connect(mapStateToProps)(DateRangeFilterComponent);
