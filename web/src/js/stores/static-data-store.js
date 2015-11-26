import alt from '../alt';
import staticDataActions from '../actions/static-data-actions';

class StaticDataStore {
  constructor() {
    this.state = {
      dateRanges: [],
      loading: false
    };

    this.bindActions(staticDataActions);
  }

  onFetchDateRanges() {
    this.setState({
      dateRanges: [],
      loading: true
    });
  }

  onReceiveDateRanges(dateRanges) {
    this.setState({
      dateRanges: dateRanges,
      loading: false
    });
  }
}

export default alt.createStore(StaticDataStore, 'StaticDataStore');
