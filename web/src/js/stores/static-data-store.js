import alt from '../alt';
import staticDataActions from '../actions/static-data-actions';

class StaticDataStore {
  constructor() {
    this.state = {
      dateRanges: [],
      currentDateRange: null,
      loaded: false
    };

    this.bindActions(staticDataActions);
  }

  onFetchDateRanges() {
    this.setState({
      dateRanges: [],
      currentDateRange: null,
      loaded: false
    });
  }

  onReceiveDateRanges(dateRanges) {
    this.setState({
      dateRanges: dateRanges,
      currentDateRange: this._getDefaultDateRange(dateRanges),
      loaded: true
    });
  }

  onSetCurrentDateRange(id) {
    this.setState({
      currentDateRange: this._findDateRangeById(id)
    });
  }

  onUpdateCurrentDateRange(data) {
    let dateRange = this.state.currentDateRange;
    if (data.fromDate) {
      dateRange.fromDate = data.fromDate;
    }
    if (data.toDate) {
      dateRange.toDate = data.toDate;
    }
    this.setState({ currentDateRange: dateRange });
  }

  _findDateRangeById(id){
    return this.state.dateRanges.filter((dateRange) => {
      return dateRange.id === id;
    })[0];
  }

  _getDefaultDateRange(dateRanges){
    return dateRanges.filter((dateRange) => {
      return dateRange.default;
    })[0];
  }
}

export default alt.createStore(StaticDataStore, 'StaticDataStore');
