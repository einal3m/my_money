import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentDateRange, updateCurrentDateRange } from '../../../actions/date-range-actions';
import DatePicker from '../date-picker/DatePicker';
import Select from '../../common/controls/Select';

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

  render() {
    if (this.props.loaded) {
      return (
        <div className="date-range-filter">
          <div className="form-group">
            <label htmlFor="dateRangeSelect" className="control-label">Dates</label>
            <Select
              name="dateRangeId"
              value={this.props.currentDateRange.id}
              options={this.props.dateRanges}
              onChange={this.onSelectDateRange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fromDate" className="control-label">From</label>
            <DatePicker
              name="fromDate"
              value={this.props.currentDateRange.fromDate}
              onChange={this.onFromDateChange}
              disabled={!this.props.currentDateRange.custom}
            />
          </div>
          <div className="form-group">
            <label htmlFor="toDate" className="control-label">To</label>
            <DatePicker
              name="toDate"
              value={this.props.currentDateRange.toDate}
              onChange={this.onToDateChange}
              disabled={!this.props.currentDateRange.custom}
            />
          </div>
        </div>
      );
    }

    return <div />;
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
